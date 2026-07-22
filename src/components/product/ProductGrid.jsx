import { motion, AnimatePresence } from "framer-motion"
import { useTranslation } from "react-i18next"
import ProductCard from "./ProductCard"

export default function ProductGrid({ products = [] }) {
  const { t } = useTranslation()

  if (!products || products.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-muted text-base font-medium">
          {t("filters.no_results", "No se encontraron productos")}
        </p>
      </div>
    )
  }

  return (
    <motion.div 
      layout
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <AnimatePresence mode="popLayout">
        {products.map((product) => (
          <motion.div
            key={product.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}
