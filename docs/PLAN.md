# Professional portfolio refinement

## Direction

A quiet, credible developer portfolio: warm neutral surfaces, deep green-charcoal text, a muted botanical accent, a restrained serif display face, and a clean sans-serif for reading. The design should look authored, not decorated by default. There are no invented client names, conversion statistics, testimonials, or fictional results.

The direction is informed by editorial portfolios that prioritize content clarity, consistent typography, authentic project context, and motion used sparingly. Examples reviewed:
- [Tarik Karahodžić — Portfolio Website](https://www.tarikkarahodzic.dev/projects/personal-site), an intentionally minimal typographic portfolio.
- [Angelo Roic — Personal Portfolio](https://angeloroic.com/work/personal-portfolio), which describes a focused presence built around content and hierarchy.
- [Hashton.dev — Portfolio site](https://hashton.dev/work/hashton), a restrained paper-and-ink system that still demonstrates frontend craft.

These references informed general principles, not copied components or visual assets.

## Content and credibility

The available public GitHub repositories did not provide enough populated project code to present several distinct finished products as genuine work. Therefore:
- The portfolio itself is the only featured project, with a direct source link.
- The other section covers technical interests rather than presenting invented case studies.
- Additional project slots are intentionally left for real work with context and working links.
- Contact points go to the real GitHub profile instead of a placeholder email address.

## Interactions

- Light/dark switch in the main navigation, with system preference as the initial value and localStorage persistence for returning visitors.
- Compact pointer-responsive Three.js scene with limited geometry and capped device pixel ratio.
- Short in-view reveals, subtle hover responses, and a scroll progress indicator.
- Responsive mobile navigation and reduced-motion support.

## Architecture

- React + Vite.
- React Three Fiber / Three.js / Drei for the interactive geometric study.
- Motion for React for short transitions.
- CSS variables define light and dark theme tokens so the entire interface changes consistently.

## Local verification

```bash
npm install
npm run dev
npm run build
```

Check desktop and mobile layouts, keyboard focus, color contrast, light/dark persistence, and low-power mobile rendering before public launch.
