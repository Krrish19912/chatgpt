# Art-directed portfolio redesign

## New creative direction: MAKE IT MATTER

The first concept used a familiar black-and-lime SaaS aesthetic and repeated small labels, floating pills, and restrained cards. This redesign moves to an editorial / neo-brutalist direction with warmer paper, vivid coral, electric violet, and acid-lime as a selectable alternate mode. Large condensed type carries the brand; 3D and illustration break the grid.

## Reference-informed design decisions

- Experimental portfolios such as [Samsy's Gen-02](https://www.webgpu.com/showcase/gen-02-portfolio-an-immersive-world/) treat the portfolio itself as a designed world rather than a generic list of projects. This implementation borrows the principle of a visual journey, while keeping normal page navigation for discoverability and accessibility.
- Creative developer work from [Lucas Vallenet](https://lucasvallenet.com/) presents motion and interaction as part of the craft; here motion is attached to a purpose: scene exploration, visual transitions, and hover feedback.
- Awwwards' experimental portfolio references and design writeups commonly combine strong typographic art direction, bespoke graphics, and WebGL. This version uses CSS-made project art and procedural WebGL rather than stock preview images or externally hosted 3D models.

## Page composition

1. **A loud hero:** “Make it Matter” statement, asymmetric geometry, a procedural animated 3D sculpture, technical microcopy only where it supports the artwork, and two clear actions.
2. **Movement interlude:** a full-width, continuously moving statement band.
3. **Project playground:** three illustrative project concepts rendered as graphic posters/UI compositions; asymmetrical 2-column layout rather than uniform cards.
4. **About:** coral full-bleed section with oversized editorial copy and a human introduction.
5. **Capabilities:** three expandable-feeling rows with restrained feedback and tech tags.
6. **Contact:** electric-violet finale, large type, prominent contact action, and moving text strip.

## Implementation

- React + Vite, current configured dependencies.
- React Three Fiber + Three.js + Drei: procedural distorted icosahedron, wireframe layers, orbital rings, environment lighting, sparkles, pointer rotation.
- Motion for React: entrance sequences, in-view reveals, scroll-linked decorative rotation, progress indicator, and a selectable “play mode” color change.
- CSS art: three bespoke cover visuals built from shapes, gradients, typography, and UI fragments, so the visual layer is fast and editable.
- Responsive navigation and art direction for phone/tablet/desktop; reduced-motion styles and Motion's user preference configuration.

## Before publishing

- The three showcased projects are design concepts, not verified client work. Replace them with genuine project names, outcomes, and demo/source links.
- Update `hello@krrish.dev` and the LinkedIn profile before launch.
- The external fonts are loaded from Google Fonts; sensible font-family fallbacks are included.
- Verify rendering in the target mobile browsers and on a slower GPU after deployment.

## Run locally

```bash
npm install
npm run dev
npm run build
```
