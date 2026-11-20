import { useEffect, useMemo, useState } from "react";

const WEEK_COUNT = 26;
const REFRESH_INTERVAL = 5 * 60 * 1000;

function toKey(date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return date.getFullYear() + "-" + month + "-" + day;
}

function startOfDay(value) {
  const date = new Date(value);
  date.setHours(0, 0, 0, 0);
  return date;
}

/** GitHub heatmap layout: Sunday through Saturday, 26 weeks. */
function buildWeeks(contributions) {
  const byDate = new Map(contributions.map((entry) => [entry.date, entry]));
  const today = startOfDay(new Date());

  const start = new Date(today);
  start.setDate(today.getDate() - today.getDay() - (WEEK_COUNT - 1) * 7);

  return Array.from({ length: WEEK_COUNT }, (_, week) =>
    Array.from({ length: 7 }, (_, day) => {
      const date = new Date(start);
      date.setDate(start.getDate() + week * 7 + day);
      const key = toKey(date);
      const entry = byDate.get(key);
      return {
        date: key,
        count: entry?.count ?? 0,
        level: entry?.level ?? 0,
        future: date > today,
      };
    }),
  );
}

export function useGitHubActivity(username) {
  const [state, setState] = useState({
    contributions: [],
    yearTotal: null,
    year: null,
    profile: null,
    checkedAt: null,
    loading: true,
    stale: false,
    error: false,
  });

  useEffect(() => {
    // This endpoint is deliberately restricted server-side to the site's
    // actual GitHub account; it requires no exposed token in the browser.
    if (username !== "mwasif666") {
      setState((old) => ({ ...old, loading: false, error: true }));
      return undefined;
    }

    let active = true;
    let inFlight = false;
    let lastAttempt = 0;
    let controller;

    const refresh = async () => {
      if (!active || document.hidden || inFlight) return;
      if (Date.now() - lastAttempt < REFRESH_INTERVAL) return;
      lastAttempt = Date.now();
      inFlight = true;
      controller = new AbortController();

      try {
        const response = await fetch("/api/github-activity", {
          signal: controller.signal,
          cache: "no-store",
          headers: { Accept: "application/json" },
        });
        if (!response.ok) throw new Error("Latest GitHub data unavailable");
        const data = await response.json();
        if (!Array.isArray(data.contributions) ||
            !Number.isFinite(data.yearTotal) ||
            !Number.isFinite(data.year)) {
          throw new Error("Invalid GitHub response");
        }

        if (active) {
          setState({
            contributions: data.contributions,
            yearTotal: data.yearTotal,
            year: data.year,
            profile: data.profile,
            checkedAt: data.checkedAt,
            loading: false,
            stale: false,
            error: false,
          });
        }
      } catch (error) {
        if (active && error.name !== "AbortError") {
          // Preserve previously verified data instead of replacing real
          // contributions with made-up public event counts or zeroes.
          setState((old) => ({
            ...old,
            loading: false,
            stale: Boolean(old.checkedAt),
            error: !old.checkedAt,
          }));
        }
      } finally {
        inFlight = false;
        controller = null;
      }
    };

    const onFocus = () => void refresh();
    const onVisibility = () => {
      if (!document.hidden) void refresh();
    };
    const onOnline = () => void refresh();

    void refresh();
    const timer = window.setInterval(refresh, REFRESH_INTERVAL);
    window.addEventListener("focus", onFocus);
    window.addEventListener("online", onOnline);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      active = false;
      window.clearInterval(timer);
      controller?.abort();
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("online", onOnline);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [username]);

  const weeks = useMemo(
    () => buildWeeks(state.contributions),
    [state.contributions],
  );

  const windowTotal = useMemo(
    () =>
      weeks.reduce(
        (total, week) =>
          total + week.reduce((sum, day) => sum + day.count, 0),
        0,
      ),
    [weeks],
  );

  return { ...state, weeks, windowTotal };
}
