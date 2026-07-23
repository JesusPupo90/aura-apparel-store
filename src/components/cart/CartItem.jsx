/* ==========================================================================
   IMPORTS & CONFIG
   ========================================================================== */

import { useTranslation } from "react-i18next"
import { Minus, Plus, Trash2 } from "lucide-react"
import { useCart } from "../../context/CartContext"
import { formatPrice } from "../../utils/currency"

/* ==========================================================================
   STATE & HOOKS
   ========================================================================== */

export default function CartItem({ item }) {
  const { t, i18n } = useTranslation()
  const { updateQuantity, removeFromCart } = useCart()
  const currentLang = i18n.language
  const { product, size, quantity } = item
  const productName = product.name?.[currentLang] || product.name?.en || ""
  const itemSubtotalUSD = (Number(product.priceUSD) || 0) * (Number(quantity) || 1)

/* ==========================================================================
   RENDER / JSX
   ========================================================================== */

  return (
    <div className="p-4 flex gap-4 bg-white border border-black/10 rounded-2xl shadow-sm">
      <img
        src={product.images?.primary}
        alt={productName}
        className="w-20 h-20 object-cover rounded-xl flex-shrink-0 bg-neutral-100"
      />

      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start gap-2">
            <h3 className="text-sm font-medium text-surface-dark truncate">
              {productName}
            </h3>
            <button
              onClick={() => removeFromCart(product.id, size)}
              aria-label="Remove item"
              className="text-muted hover:text-error transition-colors p-0.5"
            >
              <Trash2 size={15} />
            </button>
          </div>

          <p className="text-xs text-muted mt-0.5">
            {t("product.select_size")}: <span className="font-semibold text-surface-dark">{size}</span>
          </p>
        </div>

        {/* --- QUANTITY CONTROLS --- */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2 border border-black/10 rounded-full px-2 py-1 bg-neutral-50">
            <button
              onClick={() => updateQuantity(product.id, size, quantity - 1)}
              aria-label="Decrease quantity"
              className="text-muted hover:text-surface-dark transition-colors p-0.5"
            >
              <Minus size={12} />
            </button>

            <span className="text-xs font-semibold text-surface-dark w-5 text-center select-none">
              {quantity}
            </span>

            <button
              onClick={() => updateQuantity(product.id, size, quantity + 1)}
              aria-label="Increase quantity"
              className="text-muted hover:text-surface-dark transition-colors p-0.5"
            >
              <Plus size={12} />
            </button>
          </div>

          <p className="text-sm text-surface-dark font-semibold">
            {formatPrice(itemSubtotalUSD, currentLang)}
          </p>
        </div>
      </div>
    </div>
  )
}
