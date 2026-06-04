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
- `polycotton-twill-85-15.webp` ✓ *(provided)*
  - 8 colour variants in `polycotton-twill-85-15/` subdirectory ✓ *(provided)*
- `poly-cotton-drill.webp` ✓ *(provided)*
  - 7 colour variants in `poly-cotton-drill/` subdirectory ✓ *(provided)*
- `poly-cotton-poplin.webp` ✓ *(provided)*
  - 14 colour variants in `poly-cotton-poplin/` subdirectory ✓ *(provided)*
- `waterproof-taffeta.webp` ✓ *(provided)*
  - 3 colour variants in `waterproof-taffeta/` subdirectory ✓ *(provided)*
- `hi-vis-vesting.webp` ✓ *(provided)*
  - 2 colour variants in `hi-vis-vesting/` subdirectory ✓ *(provided)*
- `polyester-mesh.webp` ✓ *(provided)*
  - 4 colour variants in `polyester-mesh/` subdirectory ✓ *(provided)*
- `rubberised-oxford.webp` ✓ *(provided)*
  - 2 colour variants in `rubberised-oxford/` subdirectory ✓ *(provided)*

### Corporate Apparel
- `lacoste-pique.webp` ✓ *(provided)*
  - 13 colour variants in `lacoste-pique/` subdirectory ✓ *(provided)*
- `cotton-pique.jpg`
- `cotton-poplin.webp` ✓ *(provided)*
  - 7 colour variants in `cotton-poplin/` subdirectory ✓ *(provided)*
- `cotton-shirting-twill.webp` ✓ *(provided)*
  - 4 colour variants in `cotton-shirting-twill/` subdirectory ✓ *(provided)*
- `polyester-satin-blouse.jpg`
- `polar-fleece.webp` ✓ *(provided)*
  - 12 colour variants in `polar-fleece/` subdirectory ✓ *(provided)*
- `softshell-3-layer.webp` ✓ *(provided)*
  - 6 colour variants in `softshell-3-layer/` subdirectory ✓ *(provided)*
- `cotton-elastane-chino.jpg`
- `poly-viscose-suiting.jpg`
- `poly-viscose-blend.jpg`
- `cotton-denim.webp` ✓ *(provided)*
- `cotton-poly-denim.webp` ✓ *(provided)*
  - 3 weight×colour variants in `cotton-poly-denim/` subdirectory ✓ *(provided)*
- `heavy-duty-denim.jpg`

### Promotional & Gifts
- `loomstate-calico.webp` ✓ *(provided)*
- `combed-cotton-jersey-180g.jpg`
- `brushed-cotton-twill.jpg`
- `acrylic-rib-knit.jpg`
- `polyester-600d.jpg`
- `polyester-pongee-190t.jpg`

### Sports
- `micro-active.webp` ✓ *(provided)*
  - 12 colour variants in `micro-active/` subdirectory ✓ *(provided)*
- `taslon.webp` ✓ *(provided)*
  - 8 colour variants in `taslon/` subdirectory ✓ *(provided)*
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
