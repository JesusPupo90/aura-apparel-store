import { useTranslation } from "react-i18next"
import { useNavigate, useLocation } from "react-router-dom"

export default function Footer() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()

  const handleNavClick = (sectionId) => {
    if (location.pathname !== "/") {
      navigate("/")
      setTimeout(() => {
        scrollToSection(sectionId)
      }, 100)
    } else {
      scrollToSection(sectionId)
    }
  }

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="w-full border-t border-surface-dark/20 bg-light backdrop-blur-md pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 text-left">
          
          <div className="space-y-3 md:col-span-1">
            <span 
              onClick={() => handleNavClick("hero")}
              className="text-lg font-black tracking-widest uppercase block text-surface-dark cursor-pointer select-none"
            >
              AURA APPAREL
            </span>
            <p className="text-xs text-surface-dark/60 leading-relaxed font-mono">
              [ SS/26 ARCHIVE ]<br />
              High-density minimalist silhouettes engineered for endurance.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold tracking-widest uppercase text-surface-dark">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-surface-dark/70 font-medium">
              <li>
                <button 
                  onClick={() => handleNavClick("catalog")} 
                  className="hover:text-surface-dark transition-colors"
                >
                  {t("nav.all")}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick("filters")} 
                  className="hover:text-surface-dark transition-colors"
                >
                  {t("nav.categories")}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick("hero")} 
                  className="hover:text-surface-dark transition-colors"
                >
                  Top / Hero
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold tracking-widest uppercase text-surface-dark">
              Client Care
            </h4>
            <ul className="space-y-2 text-xs text-surface-dark/70 font-medium">
              <li className="cursor-pointer hover:text-surface-dark transition-colors">Shipping & Returns</li>
              <li className="cursor-pointer hover:text-surface-dark transition-colors">Size Guide</li>
              <li className="cursor-pointer hover:text-surface-dark transition-colors">Terms & Privacy</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold tracking-widest uppercase text-surface-dark">
              Connect
            </h4>
            <ul className="space-y-2 text-xs text-surface-dark/70 font-medium font-mono">
              <li>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-surface-dark transition-colors">
                  INSTAGRAM ↗
                </a>
              </li>
              <li>
                <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="hover:text-surface-dark transition-colors">
                  TIKTOK ↗
                </a>
              </li>
              <li>
                <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-surface-dark transition-colors">
                  TWITTER / X ↗
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-surface-dark/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-surface-dark/70 font-poppins">
          <p>© {new Date().getFullYear()} AURA APPAREL. {t("footer.rights", "All rights reserved.")}</p>

          <p>
            {t("footer.dev_prefix")}{" "}
            <span className="text-surface-dark/40 font-bold">
              {t("footer.dev_name")}
            </span>
            {" • "}
            {t("footer.dev_studio")}
          </p>
        </div>

      </div>
    </footer>
  )
}