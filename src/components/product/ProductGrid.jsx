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
      className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 overflow-x-auto sm:overflow-visible snap-x snap-mandatory pb-4 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0"
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
            className="min-w-[82vw] sm:min-w-0 snap-center flex-shrink-0 sm:flex-shrink"
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}