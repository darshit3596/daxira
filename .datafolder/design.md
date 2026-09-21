# Design System Specification — Daxira InfoTech

This document defines the complete visual design system, UI components, typography hierarchy, color tokens, and responsive layout standards for **Daxira InfoTech** to ensure visual consistency across all pages and components.

---

## 1. Brand Identity & Design Ethos

- **Brand Name**: Daxira InfoTech
- **Founder & Principal**: Darshit Sapariya
- **Design Philosophy**: High-craft architectural editorial web design. Minimalist, premium, fast, and modern with clear visual hierarchy.
- **Tone**: Professional, trustworthy, direct, and developer-first.

---

## 2. Color Palette & Tokens

| Token Name | Hex / CSS Value | Description & Usage |
| :--- | :--- | :--- |
| **Canvas Background** | `#faf9fd` | Soft off-white canvas for clean editorial feel |
| **Primary Text** | `#191a20` | High-contrast dark charcoal for primary copy & headings |
| **Secondary Text** | `#5c5f73` | Muted dark gray for subtitles & body text |
| **Muted Text** | `#8c8f9f` | Light gray for metadata, captions, & subtle labels |
| **Accent Primary** | `#4f47e6` | Electric Indigo for primary buttons, active links, focus rings |
| **Accent Hover** | `#3b34c2` | Deeper indigo for button hover states |
| **Accent Soft BG** | `#eef0ff` | Very light indigo tint for active badges & highlights |
| **Card / Surface BG** | `#ffffff` | Pure white background for elevated cards & sections |
| **Border Light** | `#e6e4f0` | Subtle border color for cards, dividers, & inputs |
| **Selection Highlight** | BG: `#4f47e6`, Text: `#ffffff` | Text selection styling |

---

## 3. Typography System

All fonts are preloaded via Google Fonts in `index.html`.

```css
/* Font Family Declarations */
--font-heading: 'Plus Jakarta Sans', sans-serif;
--font-body: 'Inter', sans-serif;
--font-mono: 'JetBrains Mono', monospace;
--font-handwriting: 'Caveat', cursive;
```

### Hierarchy Rules

1. **Hero Display Heading**: `Plus Jakarta Sans`, 800 weight / bold, `text-4xl sm:text-5xl lg:text-6xl`, tracking tight.
2. **Section Headings (H2)**: `Plus Jakarta Sans`, 700 weight, `text-3xl sm:text-4xl`, text `#191a20`.
3. **Card Titles (H3)**: `Plus Jakarta Sans`, 600 weight, `text-xl sm:text-2xl`.
4. **Subtitles / Lead Text**: `Inter`, 400-500 weight, `text-lg sm:text-xl`, text `#5c5f73`.
5. **Body Copy**: `Inter`, 400 weight, `text-base`, text `#191a20` or `#5c5f73`.
6. **Badges / Technical Tags**: `JetBrains Mono`, 500 weight, uppercase, `text-xs tracking-wider`.
7. **Personal Notes / Accents**: `Caveat`, 600 weight, cursive handwriting accent.

---

## 4. Spacing & Container Layout Rules

- **Max Container Width**: `max-w-7xl` (`1280px`) centered with `mx-auto`.
- **Horizontal Container Padding**: `px-4 sm:px-6 lg:px-8`.
- **Section Vertical Padding**:
  - Compact: `py-12 sm:py-16`
  - Standard: `py-16 sm:py-24`
  - Large / Hero: `py-20 sm:py-32`
- **Grid Gaps**:
  - Cards Grid: `gap-6 lg:gap-8`
  - Inline Badges: `gap-2 sm:gap-3`

---

## 5. UI Components & Patterns

### 5.1 Buttons

- **Primary Action Button**:
  - Background `#4f47e6`, text `#ffffff`, rounded `rounded-xl` or `rounded-full`.
  - Hover: `bg-[#3b34c2] shadow-md shadow-indigo-200 transition-all duration-200 hover:-translate-y-0.5`.
- **Secondary / Outline Button**:
  - Border `border border-[#e6e4f0]`, background `#ffffff`, text `#191a20`.
  - Hover: `bg-[#faf9fd] border-[#4f47e6] text-[#4f47e6]`.

### 5.2 Cards & Elevates

- **Standard Card**: `bg-white border border-[#e6e4f0] rounded-2xl p-6 sm:p-8 shadow-sm transition-all duration-300 hover:shadow-md hover:border-[#4f47e6]/30`.
- **Featured Card**: `bg-gradient-to-br from-white to-[#f4f2fa] border-2 border-[#4f47e6] rounded-2xl p-6 sm:p-8 shadow-lg shadow-indigo-100`.

### 5.3 Badges & Pills

- **Standard Badge**: `inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#eef0ff] text-[#4f47e6] border border-[#4f47e6]/20`.
- **Status Indicator**: `w-2 h-2 rounded-full bg-emerald-500 animate-pulse`.

---

## 6. Motion & Micro-Animations

- **Library**: `motion` (Framer Motion API).
- **Default Transition Curve**: `easeOut`, duration `0.4s` to `0.6s`.
- **Scroll Reveal**: Elements fade in and slide up (`initial={{ opacity: 0, y: 20 }}`, `whileInView={{ opacity: 1, y: 0 }}`).
- **Interactive Feedback**: All clickable elements use smooth CSS transitions (`transition-all duration-200`).

---

## 7. Responsive Breakpoints

- **Mobile (`< 640px`)**: Single column layout, collapsed header menu, full-width touch-friendly buttons.
- **Tablet (`640px - 1023px`)**: 2-column card layouts, expanded navigation where space permits.
- **Desktop (`>= 1024px`)**: 3-column grids, sticky sidebars, full header menu.
