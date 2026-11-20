// Server-side proxy for the user's public GitHub contribution calendar.
// This avoids exposing credentials and makes the portfolio independent of
// the hourly-cached community contributions API used previously.
const USERNAME = "mwasif666";
const CACHE_SECONDS = 300;

function parseCalendar(html, year) {
  const heading = html.match(
    /<h2\b[^>]*id="js-contribution-activity-description"[^>]*>([\s\S]*?)<\/h2>/i,
  );
  const text = heading?.[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ") || "";
  const totalMatch = text.match(/([\d,]+)\s+contributions?\s+in\s+(\d{4})/i);
  if (!totalMatch || Number(totalMatch[2]) !== year) {
    throw new Error("GitHub calendar summary format changed");
  }

  const tooltipCounts = new Map();
  for (const [, id, markup] of html.matchAll(
    /<tool-tip\b[^>]*\bfor="([^"]+)"[^>]*>([\s\S]*?)<\/tool-tip>/gi,
  )) {
    const label = markup.replace(/<[^>]+>/g, "").trim();
    const amount = label.match(/^([\d,]+)\s+contributions?\b/i);
    tooltipCounts.set(id, amount ? Number(amount[1].replace(/,/g, "")) : 0);
  }

  const contributions = [];
  for (const match of html.matchAll(
    /<td\b(?=[^>]*\bdata-date="(\d{4}-\d{2}-\d{2})")(?=[^>]*\bid="([^"]+)")(?=[^>]*\bdata-level="([0-4])")(?=[^>]*>)[^>]*>/g,
  )) {
    const [, date, id, level] = match;
    if (!date.startsWith(String(year)) || !tooltipCounts.has(id)) continue;
    contributions.push({
      date,
      count: tooltipCounts.get(id),
      level: Number(level),
    });
  }

  // Never show invented zeros if GitHub changes its markup or redirects us.
  const yearTotal = Number(totalMatch[1].replace(/,/g, ""));
  const sum = contributions.reduce((total, day) => total + day.count, 0);
  if (contributions.length < 300 || sum !== yearTotal) {
    throw new Error("GitHub calendar data could not be validated");
  }
  return { contributions, yearTotal };
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const year = new Date().getUTCFullYear();
  const from = String(year) + "-01-01";
  const to = String(year) + "-12-31";

  try {
    const [calendarResponse, profileResponse] = await Promise.all([
      fetch(
        "https://github.com/users/" + USERNAME + "/contributions?from=" +
          from + "&to=" + to,
        {
          headers: {
            Accept: "text/html",
            "User-Agent": "wasifmajeed-portfolio/1.0",
          },
          signal: AbortSignal.timeout(12000),
        },
      ),
      fetch("https://api.github.com/users/" + USERNAME, {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "wasifmajeed-portfolio/1.0",
        },
        signal: AbortSignal.timeout(12000),
      }).catch(() => null),
    ]);

    if (!calendarResponse.ok) {
      throw new Error("GitHub calendar HTTP " + calendarResponse.status);
    }

    const calendar = parseCalendar(await calendarResponse.text(), year);

    // The heatmap covers 26 weeks. In the first half of a new year, some
    // of those weeks are in the previous calendar year.
    // Fetch the prior calendar only when it is needed, without letting a
    // failure of optional older data break today's numbers.
    let contributions = calendar.contributions;
    if (new Date().getUTCMonth() < 6) {
      try {
        const previousYear = year - 1;
        const previousResponse = await fetch(
          "https://github.com/users/" + USERNAME + "/contributions?from=" +
            previousYear + "-01-01&to=" + previousYear + "-12-31",
          {
            headers: {
              Accept: "text/html",
              "User-Agent": "wasifmajeed-portfolio/1.0",
            },
            signal: AbortSignal.timeout(8000),
          },
        );
        if (previousResponse.ok) {
          const previous = parseCalendar(
            await previousResponse.text(),
            previousYear,
          );
          contributions = [...previous.contributions, ...contributions];
        }
      } catch {
        // Current-year data is still valid.
      }
    }

    const profile = profileResponse?.ok
      ? await profileResponse.json().catch(() => null)
      : null;

    res.setHeader(
      "Cache-Control",
      "public, max-age=0, s-maxage=" + CACHE_SECONDS +
        ", stale-while-revalidate=300",
    );

    return res.status(200).json({
      ...calendar,
      contributions,
      year,
      checkedAt: new Date().toISOString(),
      profile: profile
        ? { public_repos: profile.public_repos, html_url: profile.html_url }
        : null,
      source: "github.com",
    });
  } catch (error) {
    console.warn("GitHub calendar temporarily unavailable:", error.message);
    // This public community API has a documented one-hour cache. Only use
    // it when the official calendar cannot be read, and disclose the delay.
    try {
      const fallbackYear = new Date().getUTCFullYear();
      const fallbackResponse = await fetch(
        "https://github-contributions-api.jogruber.de/v4/" +
          USERNAME + "?y=" + fallbackYear,
        { signal: AbortSignal.timeout(10000) },
      );
      if (!fallbackResponse.ok) throw new Error("Fallback unavailable");
      const data = await fallbackResponse.json();
      if (!Array.isArray(data.contributions) ||
          !Number.isFinite(data.total?.[fallbackYear])) {
        throw new Error("Fallback response invalid");
      }
      res.setHeader(
        "Cache-Control",
        "public, max-age=0, s-maxage=300, stale-while-revalidate=300",
      );
      return res.status(200).json({
        contributions: data.contributions,
        yearTotal: data.total[fallbackYear],
        year: fallbackYear,
        checkedAt: new Date().toISOString(),
        profile: null,
        source: "hourly-community-cache",
        stale: true,
      });
    } catch {
      res.setHeader("Cache-Control", "no-store");
      return res.status(503).json({
        error: "Latest GitHub contribution data is temporarily unavailable",
      });
    }
  }
}
