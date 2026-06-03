# Fabric swatch photography

Drop fabric close-up photos here. Each filename must match a fabric's
`slug` in `data/fabrics.ts`.

**Format:** JPG or WEBP, square crop (recommended), ~1000–1500 px per edge.
**Style:** Tight, well-lit close-up showing the actual weave/texture
(zoom into the cloth — model shots belong on the product pages).

**Per-colour palettes:** if a fabric ships in many colourways and you have
a swatch photo of each colour, drop them into a subdirectory like
`/swatches/sweat-management/charcoal-grey.webp`, `/black.webp`, etc., and
list them under `colourSwatches` in `data/fabrics.ts` (see the
`sweat-management-honeycomb` entry as an example). They render as a small
grid in the expanded glossary panel.

## Expected filenames

### Workwear & PPE
- `poly-cotton-drill.webp` ✓ *(provided)*
  - 7 colour variants in `poly-cotton-drill/` subdirectory ✓ *(provided)*
- `poly-cotton-poplin.webp` ✓ *(provided)*
  - 14 colour variants in `poly-cotton-poplin/` subdirectory ✓ *(provided)*
- `polyester-mesh.webp` ✓ *(provided)*
  - 4 colour variants in `polyester-mesh/` subdirectory ✓ *(provided)*
- `rubberised-oxford.webp` ✓ *(provided)*
  - 2 colour variants in `rubberised-oxford/` subdirectory ✓ *(provided)*
- `abs-polycarbonate-shell.jpg`

### Corporate Apparel
- `cotton-pique.jpg`
- `cotton-oxford.jpg`
- `polyester-satin-blouse.jpg`
- `softshell-3-layer.jpg`
- `cotton-elastane-chino.jpg`
- `poly-viscose-suiting.jpg`
- `poly-viscose-blend.jpg`
- `cotton-denim.jpg`
- `heavy-duty-denim.jpg`

### Promotional & Gifts
- `combed-cotton-jersey-180g.jpg`
- `brushed-cotton-twill.jpg`
- `acrylic-rib-knit.jpg`
- `polyester-600d.jpg`
- `polyester-pongee-190t.jpg`
- `polyester-satin-lanyard.jpg`

### Event & Signage
- `knitted-polyester-satin-flag.jpg`
- `pvc-coated-polyester-banner.jpg`
- `frontlit-pvc-440g.jpg`
- `aluminium-composite-flex.jpg`

### Sports
- `triacetate.webp` ✓ *(provided)*
  - 15 colour variants in `triacetate/` subdirectory ✓ *(provided)*
- `polyester-spandex-interlock.jpg`
- `moisture-wicking-polyester-150g.jpg`
- `sweat-management-honeycomb.webp` ✓ *(provided)*
  - 20 colour variants in `sweat-management/` subdirectory ✓ *(provided)*

### Schoolwear
- `poly-cotton-twill-school.jpg`
- `cotton-jersey-160g-kids.jpg`

## How the page handles missing images

The glossary at `/fabric-glossary` renders a dark gradient with a small
`Layers` icon as a fallback whenever a swatch image is missing or fails
to load — so you can drop files in one at a time and the page never breaks.
