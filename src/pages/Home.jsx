import { useState, useMemo } from "react"
import { useTranslation } from "react-i18next"
import products from "../data/products.json"
import ProductFilter from "../components/product/ProductFilter"
import ProductGrid from "../components/product/ProductGrid"

const HERO_IMAGE = "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1920&q=80"

export default function Home() {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredProducts = useMemo(() => {
    if (!Array.isArray(products)) return []

    const query = searchQuery.toLowerCase().trim()

    return products.filter((product) => {
      const nameEn = typeof product?.name === 'string' 
        ? product.name 
        : product?.name?.en || ""
      
      const nameEs = typeof product?.name === 'string' 
        ? product.name 
        : product?.name?.es || ""

      const matchesSearch =
        query === "" ||
        nameEn.toLowerCase().includes(query) ||
        nameEs.toLowerCase().includes(query)

      const matchesCategory =
        activeCategory === "all" || product?.category === activeCategory

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, activeCategory])

  return (
    <div>
      <section className="relative min-h-[70vh] flex items-center bg-light">
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE}
            alt=""
            className="w-full h-full object-cover object-center opacity-5"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-2xl">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-surface-dark leading-[0.9] tracking-tight">
              {t("hero.title")}
            </h1>
            <p className="mt-6 text-base sm:text-lg text-muted max-w-lg leading-relaxed">
              {t("hero.subtitle")}
            </p>
            <button className="mt-8 bg-surface-dark text-light rounded-full px-8 py-3.5 text-sm font-medium tracking-wider hover:bg-neutral-800 transition-colors">
              {t("hero.cta")}
            </button>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-light border-t border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <ProductFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          {filteredProducts.length === 0 ? (
            <p className="text-center text-muted py-20 text-sm">
              No products match your search.
            </p>
          ) : (
            <ProductGrid products={filteredProducts} />
          )}
        </div>
      </section>
    </div>
  )
}