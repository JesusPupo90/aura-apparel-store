import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { useCart } from "../../context/CartContext"
import { formatPrice } from "../../utils/currency"
import CartItem from "./CartItem"

export default function CartDrawer() {
  const { t, i18n } = useTranslation()
  const { cartItems, isCartOpen, setIsCartOpen, totalPriceUSD } = useCart()
  const currentLang = i18n.language

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isCartOpen])

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md z-50 bg-light border-l border-black/10 flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between p-6 border-b border-black/10">
              <h2 className="text-lg font-semibold text-surface-dark tracking-wider uppercase">
                {t("cart.title")}
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                aria-label="Close cart"
                className="text-muted hover:text-surface-dark transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>

            {cartItems.length === 0 ? (
              <div className="flex-1 flex items-center justify-center p-6">
                <p className="text-muted text-sm">{t("cart.empty")}</p>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {cartItems.map((item) => (
                    <CartItem
                      key={`${item.product.id}-${item.size}`}
                      item={item}
                    />
                  ))}
                </div>

                {/* Footer del Cart con Totales */}
                <div className="border-t border-black/10 p-6 space-y-4 bg-black/5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted">{t("cart.subtotal")}</span>
                    <span className="text-surface-dark font-semibold text-base">
                      {formatPrice(totalPriceUSD, currentLang)}
                    </span>
                  </div>
                  <button className="bg-surface-dark text-light hover:bg-neutral-800 transition-colors rounded-full py-3 w-full text-center text-sm font-medium tracking-wide">
                    {t("cart.checkout")}
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}