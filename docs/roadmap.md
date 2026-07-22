# Roadmap & Implementation Checklist: AURA APPAREL

### Phase 1: Project Setup & Infrastructure
- [ ] **Task 1.1:** Initialize Vite + React project (`npm create vite@latest aura-apparel -- --template react`).
- [ ] **Task 1.2:** Install dependencies (`react-router-dom`, `tailwindcss`, `framer-motion`, `i18next`, `react-i18next`, `lucide-react`).
- [ ] **Task 1.3:** Configure Google Fonts (`Poppins` & `Plus Jakarta Sans`) in `index.html`.
- [ ] **Task 1.4:** Setup Tailwind CSS & custom semantic classes in `src/index.css`.
- [ ] **Task 1.5:** Configure `i18next` with JSON translation dictionaries (`en.json`, `es.json`).

---

### Phase 2: Core Utilities & Data Layer
- [ ] **Task 2.1:** Create `src/data/products.json` mock database with high-res Unsplash URLs and dual-language fields.
- [ ] **Task 2.2:** Implement safe currency utility module (`src/utils/currency.js`) handling exchange rate ($1 USD = $4,000 COP) and `NaN` guards.
- [ ] **Task 2.3:** Create global `CartContext.jsx` for managing state (add, remove, quantity update, total calculations).

---

### Phase 3: Global Layout & Core Components
- [ ] **Task 3.1:** Build `Navbar.jsx` (Logo, Category Links, Language/Currency Switcher, Cart Badge).
- [ ] **Task 3.2:** Build `Footer.jsx` with developer credit:
  - English: "Developed by **Jesus Pupo** • **WannaDev Studios**"
  - Spanish: "Desarrollado por **Jesus Pupo** • **WannaDev Studios**"
  - Styled with Poppins font and `.brand-contrast` highlight on "Jesus Pupo".
- [ ] **Task 3.3:** Build `CartDrawer.jsx` (Slide-over panel with Framer Motion, item controls, empty state, safe calculations).

---

### Phase 4: Views & Interactive Experience
- [ ] **Task 4.1:** Build **Home View (`/`)**:
  - Hero Section with dark ambient gradient & CTA.
  - Category Filter Pills (`All`, `Outerwear`, `T-Shirts`, `Accessories`).
  - Search Bar with live client-side string filtering.
  - Product Grid with Framer Motion layout transitions.
- [ ] **Task 4.2:** Build `ProductCard.jsx` Component:
  - Dual-image hover swap (`images.primary` -> `images.hover`).
  - Dynamic price display (`formatPrice`).
  - "Quick Add" button triggering the Cart Drawer.
- [ ] **Task 4.3:** Build **Product Detail Page (`/product/:id`)**:
  - Image gallery & main photo selection.
  - Size & Color selection state.
  - Dynamic `PromoModal.jsx` popup on load with explicit 'X' close button.
  - Size chart guide switching between Inches (EN) and Centimeters (ES).

---

### Phase 5: QA & Polish
- [ ] **Task 5.1:** Mobile-first responsive check (375px to 1440px).
- [ ] **Task 5.2:** Test edge-case numeric inputs (undefined price, empty cart recalculations).
- [ ] **Task 5.3:** Framer Motion transition performance optimization.