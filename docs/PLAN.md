# Portfolio direction — Data Lab

## Goal

Present Krrish as an early-career data science / machine-learning candidate who can also make analytics easier to explore through interfaces and visualizations. The portfolio should feel original and technically expressive without relying on invented project metrics, fake clients, or non-existent demo links.

## Visual direction

- **Palette:** near-black ink, acid-lime, a restrained periwinkle highlight, and soft gray-green copy.
- **Typography:** Space Grotesk for display and UI labels, DM Sans for body copy, Instrument Serif for the editorial accent, and DM Mono for small metadata.
- **Composition:** an oversized, left-aligned hero; custom signal-plot illustration; compact proof-point strip; bento capability cards; clean experience timeline; and a deliberately strong contact finish.
- **Motion:** short scroll reveals and restrained hover transitions. Respect the visitor's reduced-motion preference.
- **Responsive behavior:** mobile menu, stacked project cards, single-column skill cards on narrow screens, and no horizontal canvas or oversized media overflow.
- **Project honesty:** custom artwork is marked as a concept visual. Case notes use details available in the provided resume; source/demo links appear only when real destinations are known.

## Content order

1. Short role and value proposition
2. Project highlights and expandable case notes
3. Capabilities grouped by task
4. Internship experience
5. Education and certifications
6. Contact links

## Implementation

- React + Vite
- Motion for React for reveal transitions
- Lucide React icons
- CSS custom properties, CSS illustrations and inline SVG
- No Three.js dependency in the redesigned page, reducing bundle and rendering complexity

## Verification checklist

- Run `npm run build` on Node.js 22
- Check narrow/mobile layouts, category filters and case-note toggles
- Check keyboard focus and reduced-motion preference
- Confirm external URLs and contact details
- Add links to individual project repositories/demos when verified
