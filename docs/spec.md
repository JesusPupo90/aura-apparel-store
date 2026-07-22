# Technical Specification & PRD: AURA APPAREL

## 1. Executive Summary & Brand Identity
- **Brand Name:** **AURA APPAREL** (Clean luxury, high fashion, minimal aesthetic).
- **Target Audience:** Premium Streetwear & Minimal Fashion Buyers.
- **Goal:** High-impact portfolio demo featuring modern Dark Luxury / Glassmorphism aesthetics with internationalization (EN/ES) and smooth UX conversions.
- **Developer Attribution:** "Developed by / Desarrollado por **Jesus Pupo** • **WannaDev Studios**"

---

## 2. Technical Stack & Architecture

| Layer | Technology | Rationale |
| :--- | :--- | :--- |
| **Build Tool / Framework** | React 18 + Vite (JavaScript) | Fast HMR, clean bundle, standard industry choice |
| **Routing** | React Router DOM v6 | Seamless SPA navigation (Home, PDP, Cart/Modal) |
| **Styling** | Tailwind CSS v3 | Rapid utility-first design, custom class aliasing via `@layer components` |
| **Animations** | Framer Motion | Smooth layout transitions, category filter fades, hover scaling, modal slide-ins |
| **i18n & Currency** | `i18next` + `react-i18next` | Dual language (EN / ES), dynamic currency conversion ($1 USD = $4,000 COP) |
| **Typography** | Google Fonts (Poppins & Plus Jakarta Sans) | Modern sans-serif hierarchy |
| **Icons** | Lucide React | Clean, scalable modern icons |

---

## 3. Design System & Design Tokens

### Color Palette (Tailwind Configuration)
- **Surfaces:**
  - `bg-surface-dark`: `#0a0a0a` (Deep background for Hero & Layout).
  - `bg-surface-card`: `#121212` (Product cards and Cart Drawer).
- **Text:**
  - `text-light`: `#F9FAFB` (Primary text on dark backgrounds).
  - `text-muted`: `#9CA3AF` (Secondary descriptions, size guides).
- **Brand/Accent:**
  - `brand-contrast`: `#F59E0B` (Amber-500) for badges, developer attribution, and primary highlights.
- **Feedback:**
  - `text-error`: `#EF4444` (Red-500) for inline validation error messages.

### Micro-interactions & Animations
- **Product Card Hover:** `transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl`. Image swaps smoothly from primary photo to outfit photo.
- **Cart Badge:** Bouncing effect (`animate-bounce` brief) when an item is added to cart.
- **Modals (Promo):** Scale transition from `scale-95 opacity-0` to `scale-100 opacity-100`.

---

## 4. Key Functional Requirements (FR) & UX Strategies
- **FR-01 [Navbar]:** Sticky top, `backdrop-blur-md`, contains Logo, language toggle (EN/ES), and Cart Button with dynamic quantity badge.
- **FR-02 [Hero Layout]:** Must handle images responsibly using `object-cover object-center` and `overflow-hidden` on containers to prevent horizontal scrolling on mobile (Mobile First).
- **FR-03 [Cart Drawer]:** Slides from the right. Re-calculates totals safely.
- **FR-04 [Data Safety]:** All numerical fields (prices, subtotals) must pass through the `formatPrice` defensive helper to prevent `NaN` crashes.
- **FR-05 [Form Validation & Mobile UX]:** The Promo Modal includes an email subscription input. This input must have client-side validation (Required + Regex for email format). To prevent iOS Safari auto-zoom on focus, input text must be styled with `text-base` (16px) minimum. Inline error states must be displayed below the input if validation fails without causing layout shifts.

---

## 5. Directory Structure

```text
aura-apparel/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── PromoModal.jsx
│   │   ├── cart/
│   │   │   ├── CartDrawer.jsx
│   │   │   └── CartItem.jsx
│   │   └── product/
│   │       ├── ProductCard.jsx
│   │       ├── ProductGrid.jsx
│   │       └── ProductFilter.jsx
│   ├── context/
│   │   └── CartContext.jsx
│   ├── data/
│   │   └── products.json
│   ├── i18n/
│   │   ├── index.js
│   │   └── locales/
│   │       ├── en.json
│   │       └── es.json
│   ├── pages/
│   │   ├── Home.jsx
│   │   └── ProductDetail.jsx
│   ├── utils/
│   │   └── currency.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── tailwind.config.js
└── package.json
```

---

## 6. Internationalization Dictionaries (`src/i18n/locales/`)

### `src/i18n/locales/en.json`
```json
{
  "nav": {
    "all": "All Products",
    "categories": "Categories",
    "cart": "Cart"
  },
  "hero": {
    "title": "AURA ARCHIVE '26",
    "subtitle": "High-density minimalist apparel engineered for modern life.",
    "cta": "EXPLORE COLLECTION"
  },
  "filters": {
    "search_placeholder": "Search catalog...",
    "all": "All",
    "outerwear": "Outerwear",
    "tshirts": "T-Shirts",
    "accessories": "Accessories"
  },
  "product": {
    "add_to_cart": "ADD TO CART",
    "select_size": "SELECT SIZE",
    "size_guide": "Size Guide (Inches)",
    "chest": "Chest",
    "length": "Length",
    "quick_view": "QUICK VIEW",
    "out_of_stock": "OUT OF STOCK"
  },
  "cart": {
    "title": "YOUR BAG",
    "empty": "Your bag is currently empty.",
    "subtotal": "Subtotal",
    "checkout": "PROCEED TO CHECKOUT",
    "currency_symbol": "$",
    "currency_code": "USD"
  },
  "promo_modal": {
    "badge": "EXCLUSIVE DROP",
    "title": "GET 15% OFF YOUR FIRST ORDER",
    "subtitle": "Subscribe to early access drops and secret collections.",
    "button": "CLAIM OFFER",
    "dismiss": "NO THANKS, CONTINUE SHOPPING"
  },
  "footer": {
    "rights": "All rights reserved.",
    "dev_prefix": "Developed by",
    "dev_name": "Jesus Pupo",
    "dev_studio": "WannaDev Studios"
  }
}
```

### `src/i18n/locales/es.json`
```json

  {
  "nav": {
    "all": "Todos los Productos",
    "categories": "Categorías",
    "cart": "Carrito"
  },
  "hero": {
    "title": "ARCHIVO AURA '26",
    "subtitle": "Prendas minimalistas de alta densidad diseñadas para la vida moderna.",
    "cta": "EXPLORAR COLECCIÓN"
  },
  "filters": {
    "search_placeholder": "Buscar en el catálogo...",
    "all": "Todos",
    "outerwear": "Chaquetas",
    "tshirts": "Camisetas",
    "accessories": "Accesorios"
  },
  "product": {
    "add_to_cart": "AÑADIR AL CARRITO",
    "select_size": "SELECCIONAR TALLA",
    "size_guide": "Guía de Tallas (cm)",
    "chest": "Pecho",
    "length": "Largo",
    "quick_view": "VISTA RÁPIDA",
    "out_of_stock": "AGOTADO"
  },
  "cart": {
    "title": "TU BOLSA",
    "empty": "Tu bolsa está vacía.",
    "subtotal": "Subtotal",
    "checkout": "FINALIZAR COMPRA",
    "currency_symbol": "$",
    "currency_code": "COP"
  },
  "promo_modal": {
    "badge": "LANZAMIENTO EXCLUSIVO",
    "title": "OBTÉN 15% OFF EN TU PRIMERA COMPRA",
    "subtitle": "Suscríbete para acceder a lanzamientos anticipados y colecciones secretas.",
    "button": "RECLAMAR OFERTA",
    "dismiss": "NO GRACIAS, CONTINUAR COMPRANDO"
  },
  "footer": {
    "rights": "Todos los derechos reservados.",
    "dev_prefix": "Desarrollado por",
    "dev_name": "Jesus Pupo",
    "dev_studio": "WannaDev Studios"
  }
}
```
---

## 7. Mock Products Database (`src/data/products.json`)

```json
[
  {
    "id": "aura-001",
    "name": {
      "en": "Oversized Heavyweight Hoodie",
      "es": "Hoodie Heavyweight Oversize"
    },
    "category": "outerwear",
    "priceUSD": 85.00,
    "images": {
      "primary": "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
      "hover": "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80"
    },
    "sizes": ["S", "M", "L", "XL"],
    "sizeGuide": {
      "en": { "chest": "22 - 24 in", "length": "28 in" },
      "es": { "chest": "56 - 60 cm", "length": "71 cm" }
    },
    "isNew": true
  },
  {
    "id": "aura-002",
    "name": {
      "en": "Minimalist Boxy Tee",
      "es": "Camiseta Boxy Minimalista"
    },
    "category": "tshirts",
    "priceUSD": 45.00,
    "images": {
      "primary": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
      "hover": "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80"
    },
    "sizes": ["S", "M", "L"],
    "sizeGuide": {
      "en": { "chest": "20 - 22 in", "length": "26 in" },
      "es": { "chest": "50 - 55 cm", "length": "66 cm" }
    },
    "isNew": false
  }
]
```
---

## 8. Defensive Currency Helper (`src/utils/currency.js`)

```javascript
const EXCHANGE_RATE_COP = 4000;

export const formatPrice = (amountInUSD, language = 'en') => {
  const numericAmount = Number(amountInUSD);
  if (isNaN(numericAmount) || numericAmount < 0 || amountInUSD === null || amountInUSD === undefined) {
    return language === 'es' ? '$ 0 COP' : '$0.00';
  }

  if (language === 'es') {
    const amountCOP = Math.round(numericAmount * EXCHANGE_RATE_COP);
    return `$ ${amountCOP.toLocaleString('es-CO')} COP`;
  }

  return `$${numericAmount.toFixed(2)}`;
};
```

---

## 9. Semantic CSS Conventions (`src/index.css`)

Custom CSS classes inside `@layer components` must strictly follow English semantic naming:
- `.glass-card`: `bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl`
- `.glass-card-hover`: `hover:bg-white/10 hover:border-white/20 transition-all duration-300`
- `.btn-primary`: `bg-white text-black font-semibold rounded-full px-6 py-3 hover:bg-neutral-200 transition-colors`
- `.btn-secondary`: `bg-neutral-800 text-white border border-neutral-700 rounded-full px-6 py-3 hover:bg-neutral-700`
- `.badge-promo`: `bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs px-2.5 py-1 rounded-full`
- `.brand-contrast`: `text-amber-400` or `text-emerald-400` reserved for highlighting brand details.

## 10. Acceptance Criteria (AC)
### AC-01: Localization & Currency Formatting
- **Given** the user is viewing a product card,
- **When** the language is toggled from EN to ES,
- **Then** the text translates instantly and the price calculates `priceUSD * 4000`, formatting as `$ X.XXX COP`.

### AC-02: Safe Image Handling & Responsiveness
- **Given** a user is on a mobile device (screen width < 768px),
- **When** scrolling the Home page,
- **Then** no horizontal scrolling occurs (`overflow-x` is hidden on parent layout), and Hero/Product images maintain aspect ratio using `object-cover`.

### AC-03: Cart Interaction Validation
- **Given** the user clicks "Quick Add" on a product,
- **Then** the Cart Drawer opens automatically, the Navbar cart badge flashes, and the new subtotal is calculated safely without `NaN` errors.

### AC-04: Form Validation
- **Given** the user is on the Promo Modal,
- **When** they click "Claim Offer" with an empty or incorrectly formatted email,
- **Then** the form submission is prevented, and a translated error message appears dynamically below the input.