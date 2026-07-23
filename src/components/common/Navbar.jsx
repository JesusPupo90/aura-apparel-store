import { useTranslation } from "react-i18next"
import { ShoppingBag } from "lucide-react"
import { useCart } from "../../context/CartContext"

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const { totalItemsCount, setIsCartOpen } = useCart()

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "es" : "en")
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-light/90 border-b border-surface-dark/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo y Navegación Principal */}
          <div className="flex items-center gap-10">
            <span className="text-xl font-extrabold tracking-widest text-surface-dark cursor-pointer select-none">
              AURA APPAREL
            </span>

            <div className="hidden md:flex items-center gap-8">
              {/* Botón: Todos los productos */}
              <button className="relative text-sm font-medium text-surface-dark group py-1">
                <span>{t("nav.all")}</span>
                {/* Animación de línea elegante en hover */}
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-surface-dark/40 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </button>

              {/* Botón: Categorías */}
              <button className="relative text-sm font-medium text-surface-dark group py-1">
                <span>{t("nav.categories")}</span>
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-surface-dark/40 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </button>
            </div>
          </div>

          {/* Acciones del Navbar (Idioma y Carrito) */}
          <div className="flex items-center gap-6">
            
            {/* Toggle de Idioma con Capsule Hover */}
            <button
              onClick={toggleLanguage}
              className="text-xs font-bold tracking-wider text-surface-dark border border-surface-dark/20 rounded-full px-3 py-1 hover:bg-surface-dark hover:text-light transition-all duration-300"
            >
              {i18n.language === "en" ? "ES" : "EN"}
            </button>

            {/* Icono del Carrito con Micro-interacción */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Open cart"
              className="relative p-2 text-surface-dark hover:scale-110 transition-transform duration-200"
            >
              <ShoppingBag size={20} strokeWidth={2} />
              
              {totalItemsCount > 0 && (
                <span className="absolute top-0 right-0 bg-brand-contrast text-surface-dark text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-sm">
                  {totalItemsCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>
    </nav>
  )
}