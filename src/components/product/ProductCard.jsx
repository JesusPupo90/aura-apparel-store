/* ==========================================================================
   IMPORTS & CONFIG
   ========================================================================== */

import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useCart } from "../../context/CartContext"
import { formatPrice } from "../../utils/currency"
import { PiHeartBreak, PiHeartFill } from "react-icons/pi"

import { optimizeUnsplash } from "../../utils/imageOptimizer"

const STORAGE_KEY = "aura_favorites"

function getStoredFavorites() {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function toggleFavorite(id) {
  const current = getStoredFavorites()
  const updated = current.includes(id)
    ? current.filter((fid) => fid !== id)
    : [...current, id]
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  return updated
}

/* ==========================================================================
   STATE & HOOKS
   ========================================================================== */

export default function ProductCard({ product }) {
  const { t, i18n } = useTranslation()
  const { addToCart } = useCart()
  const currentLang = i18n.language
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    setIsFavorite(getStoredFavorites().includes(product?.id))
  }, [product?.id])

  const productName = product?.name?.[currentLang] || product?.name?.en || ""
  const defaultSize = product?.sizes?.[0] || "M"
  const categoryKey = product?.category

/* ==========================================================================
   HANDLERS & LOGIC
   ========================================================================== */

  const handleAddToCart = () => {
    addToCart(product, defaultSize)
  }

  const handleToggleFavorite = (e) => {
    e.stopPropagation()
    const updated = toggleFavorite(product?.id)
    setIsFavorite(updated.includes(product?.id))
  }
  
  const hasHoverImage = Boolean(product?.images?.hover)

/* ==========================================================================
   RENDER / JSX
   ========================================================================== */

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-white border border-black/10 rounded-md overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl"
    >
      {/* --- PRODUCT IMAGE --- */}
      <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
        <img
          src={product?.images?.primary && optimizeUnsplash(product.images.primary)}
          alt={productName}
          className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-300 opacity-100"
        />

        {product?.isNew && (
          <span className="absolute top-3 left-3 badge-promo">
            NEW
          </span>
        )}

        <button
          type="button"
          onClick={handleToggleFavorite}
          className="absolute top-3 right-3 z-10 rounded-full p-2.5 bg-[#eaeaea]/70 backdrop-blur-md border border-[#eaeaea]/40 text-surface-dark shadow-sm hover:bg-[#eaeaea]/90 transition-all active:scale-95"
          aria-label={isFavorite ? t("product.remove_from_favorites") : t("product.add_to_favorites")}
        >
          {isFavorite ? (
            <PiHeartFill className="text-black" size={18} />
          ) : (
            <PiHeartBreak className="text-surface-dark/70" size={18} />
          )}
        </button>

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
      </div>

      {/* --- PRODUCT INFO --- */}
      <div className="p-4 space-y-2">
        <span className="text-xs text-muted uppercase tracking-wider block">
          {categoryKey ? t(`filters.${categoryKey}`) : ""}
        </span>

        <h3 className="text-sm font-medium text-surface-dark leading-snug">
          {productName}
        </h3>

        <p className="text-base font-semibold text-surface-dark">
          {formatPrice(product?.priceUSD, currentLang)}
        </p>

        <button
          onClick={handleAddToCart}
          className="w-full bg-surface-dark text-light rounded-md py-2.5 text-sm font-medium hover:bg-neutral-800 transition-colors mt-2"
        >
          {t("product.add_to_cart")}
        </button>
      </div>
    </div>
  )
}
