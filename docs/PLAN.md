# Classic portfolio with light and dark themes

## Design direction

A classic, contemporary developer portfolio with a quiet editorial layout: clear typographic hierarchy, generous whitespace, restrained teal accent, softly bordered cards, and consistent navigation. The goal is for the work and the person to be the focus—not experimental decoration.

## Light / dark appearance

- Light mode is the default for first-time visitors unless the device prefers dark mode.
- A visible toggle lets the visitor switch themes at any time.
- The selected theme is persisted in local storage and reused on return visits.
- CSS custom properties drive both themes; cards, separators, preview art, the 3D scene, and controls adapt with the theme.
- The browser color scheme is updated so browser-native UI matches the selected theme.
- The toggle has a descriptive accessible name and a visible focus style.

This follows the platform's `prefers-color-scheme` preference while allowing users to override it. See [web.dev color and contrast](https://web.dev/learn/accessibility/color-contrast) and [web.dev prefers-color-scheme](https://web.dev/articles/prefers-color-scheme).

## Structure

1. Clean navigation with work, about, capabilities, contact, and theme toggle.
2. Two-column introduction with a short profile, direct calls to action, and a restrained interactive 3D object.
3. Skills strip.
4. Three clear work concept cards with custom-built interface previews and explicit concept labels.
5. About section focused on approach rather than decorative effects.
6. Capabilities and technology list.
7. Concise contact CTA and footer.

## Technical choices

- React + Vite.
- React Three Fiber, Three.js, Drei for a small procedural 3D object; not a large external model.
- Motion for React for short entrance/reveal transitions and scroll progress.
- Lucide React for interface controls.
- CSS custom properties for theme tokens, plus responsive breakpoints and reduced-motion handling.

## Replace before professional launch

The sample project entries are illustrative concepts, not verified client work. Replace them with real case studies, links, and outcomes. Update `hello@krrish.dev` with the preferred contact email.

## Verify

```bash
npm install
npm run dev
npm run build
```

Check theme toggle behavior on desktop and mobile; first visit should respect the OS preference, and subsequent visits should retain the selected theme.
