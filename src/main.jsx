import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import './smooth-scroll.css';
import './banner-themes.css';
import './loader-background.css';
import './about-section.css';
import './about-dark-background.css';
import './services-section.css';
import './projects-section.css';
import './clean-portfolio-layout.css';
import './clean-portfolio-runtime.css';
import './clean-portfolio-polish.css';
import './clean-portfolio-final.css';
import './about-story.css';
import './about-story-unified.css';
import './components/ProjectsPreview.module.css';
import './responsive-fixes.css';
// Last, and unlayered, so the shimmer wins over CSS-module rules. See skeleton.css.
import './skeleton.css';

createRoot(document.getElementById('root')).render(<App />);
