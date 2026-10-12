# Portfolio build plan

## Creative direction

**Working title:** Krrish — Creative Developer  
**Concept:** A digital studio / interactive portfolio that feels precise, experimental, and a little otherworldly. A restrained acid-lime accent gives the experience a recognizable signature against near-black surfaces. Oversized editorial typography provides contrast to the technical 3D visuals.

## Information architecture

1. **Hero** — short positioning statement, availability indicator, clear work CTA, procedural WebGL sculpture, and small technical HUD labels.
2. **Selected work** — three visual case-study concepts with custom CSS-built previews, project role, concise problem framing, and technology tags.
3. **Manifesto / About** — a human point of view and concise profile.
4. **Capabilities** — creative development, 3D interaction, and interface systems.
5. **Process** — three understandable stages from framing to details.
6. **Contact** — strong CTA, email copy action with mailto fallback, and social destinations.
7. **Footer** — identity, year, and return-to-top link.

## Implementation choices

- **React + Vite:** small, fast development workflow and standard production build.
- **Three.js + React Three Fiber + Drei:** a procedural geometric sculpture built from Three.js primitives, material response, rings, sparkles, environment lighting, and pointer-driven rotation. This intentionally avoids a large external 3D model download.
- **Motion for React:** entrance reveals, in-view transitions, progress indicator, and subtle hover movement.
- **Lucide React:** consistent small interface icons.
- **CSS-first art direction:** the case-study previews are interface compositions written in CSS so they remain crisp, responsive, and easy to edit.

## Motion principles

- Use movement for feedback, hierarchy, and narrative—not for every single element.
- Keep core reading and navigation available without waiting for an animation.
- Honor `prefers-reduced-motion`, reduce visual movement in the 3D scene when requested, and make controls keyboard reachable.
- Animate primarily opacity and transforms where practical.
- Keep the canvas pixel ratio capped and limit the scene complexity to make mobile performance more predictable.

## Performance / accessibility checklist

- Canvas resolution capped at 1.5 DPR.
- Lightweight procedural geometry instead of large model textures.
- Semantic sections, nav label, descriptive anchor text, focusable links/buttons, meta description, and theme color.
- CSS breakpoints for phone, tablet, and desktop.
- Reduced-motion media query plus Motion's reduced-motion hook.
- Contact button copies the email, with a mailto fallback if clipboard access is unavailable.

## Replace these starter values before launch

- Update email `hello@krrish.dev` to the real inbox.
- Replace the project concepts and descriptions with genuine projects, live demos, and correct source URLs.
- Replace the LinkedIn placeholder with the intended profile.
- Verify location and year-specific copy.
- Add final Open Graph artwork and analytics only if needed.

## Local development

```bash
npm install
npm run dev
```

Production check:

```bash
npm run build
npm run preview
```

## References consulted

- Vite guide: https://vite.dev/guide/
- React Three Fiber hooks and rendering: https://github.com/pmndrs/react-three-fiber/blob/master/docs/API/hooks.mdx
- Motion scroll animations: https://motion.dev/docs/react-scroll-animations
- Motion useScroll API: https://motion.dev/docs/react-use-scroll
- web.dev motion accessibility: https://web.dev/learn/accessibility/motion

This is a design and implementation plan, not a claim that cross-device browser QA has already been run.
