# VERNIS · Luxury High-Gloss Nail Lacquer

> **Aesthetic**: Refined Reddish Dark Grunge Feminine  
> **Signature Feature**: Real-time full-page dynamic colour transition on shade selection & interactive Try-on hand simulation.

---

## 🎨 Design System & Palette (Blackened Cherry & Blood Velvet)

- **Canvas Base**: `#0D090B` *(Smoked Obsidian)*
- **Ink / Headlines**: `#F5ECEE` *(Faded Silk)*
- **Muted Copy**: `#8E7E84` *(Smoked Ash)*
- **Cards & Glass**: `#160E12` with `backdrop-blur-xl` and `rgba(255,255,255,0.08)` hairline borders
- **Dark Footer**: `#0E080A` *(Blackened Wine)*

### 💅 The 6 Signature Lacquers ($28 each)
1. **01 Cendre** (`#B6928C`) — Smoked mauve nude
2. **02 Garçonne** (`#A2425E`) — Dried rose crimson
3. **03 Sangria** (`#BD2B38`) — Burnt sanguine
4. **04 Cerise Noire** (`#8E0C2D`) — Deep blood cherry
5. **05 Poison** (`#6A0D23`) — Vampiric oxblood
6. **06 Morticia** (`#3B091F`) — Blackened midnight plum *(Default on load)*

---

## ⚡ Dynamic Theme Engine & Motion Specs

- **CSS Custom Properties**:
  - `--shade`: Active shade hex
  - `--shade-deep`: 25% darker shade
  - `--shade-soft`: 75% white mix for luminous editorial typography
- **Motion Curve**: `700ms cubic-bezier(.22, 1, .36, 1)` for all color and background property transitions.
- **Typographic Swap**: Vertical slide + blur filter (450ms).
- **Bottle Hover**: 6px lift with specular floor glow.

---

## 🚀 Getting Started

```bash
cd vernis
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🕹️ Interaction Controls

- **Radiogroup Bottle Selection**: Hover or use Arrow Left / Right to cycle shades.
- **Try-On Mode**: Click "Try it on" in the hero or on any collection card to zoom in and examine the close-up hand.
- **Escape / Back**: Press `Esc` or the frosted chevron button to return to Browse mode while keeping the selected shade.
- **Bag Drawer**: Add any shade to test the elastic count bounce and review the minimal checkout slide-over drawer.

