import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useCart } from "../../context/CartContext"
import { formatPrice } from "../../utils/currency"

export default function ProductCard({ product }) {
  const { t, i18n } = useTranslation()
  const { addToCart } = useCart()
  const currentLang = i18n.language
  const [isHovered, setIsHovered] = useState(false)

  const productName = product?.name?.[currentLang] || product?.name?.en || ""
  const defaultSize = product?.sizes?.[0] || "M"
  const categoryKey = product?.category

  const handleAddToCart = () => {
    addToCart(product, defaultSize)
  }
  
  const hasHoverImage = Boolean(product?.images?.hover)

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-white border border-black/10 rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
        <img
          src={product?.images?.primary}
          alt={productName}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-300 ${
            isHovered && hasHoverImage ? "opacity-0" : "opacity-100"
          }`}
        />

        {hasHoverImage && (
          <img
            src={product.images.hover}
            alt={productName}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        {product?.isNew && (
          <span className="absolute top-3 left-3 badge-promo">
            NEW
          </span>
        )}

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
      </div>

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
          className="w-full bg-surface-dark text-light rounded-full py-2.5 text-sm font-medium hover:bg-neutral-800 transition-colors mt-2"
        >
          {t("product.add_to_cart")}
        </button>
      </div>
    </div>
  )
}