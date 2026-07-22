﻿import { useState, useMemo } from "react"
import { useTranslation } from "react-i18next"
import products from "../data/products.json"
import ProductFilter from "../components/product/ProductFilter"
import ProductGrid from "../components/product/ProductGrid"

const HERO_IMAGE = "https://images.unsplash.com/photo-1762810664585-9e25b74bcdcd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

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
    <>
    <section className="bg-[#eaeaea] text-surface-dark py-8 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8 lg:space-y-12">
        
        {/* 1. Header superior con metadata */}
        <div className="flex justify-between items-center text-xs uppercase tracking-widest text-surface-dark/70 font-semibold border-b border-black/10 pb-4">
          <span>{t("hero.subtitle", "High-density minimalist apparel")}</span>
          <span className="hidden sm:inline">SS / 2026 ARCHIVE</span>
        </div>

        {/* 2. Bloque principal: Título e Imagen */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Tipografía Titular Gigante */}
          <div className="lg:col-span-7 space-y-4 text-left">
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-none tracking-tighter uppercase">
              {t("hero.title", "AURA '26")}
            </h1>
            
            <p className="text-sm sm:text-base text-surface-dark/80 max-w-md font-normal leading-relaxed pt-2">
              Engineered for modern life. Clean lines, heavyweight fabrics, and timeless silhouettes.
            </p>
          </div>

          {/* Tarjeta de Foto Editorial */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full max-w-md mx-auto lg:max-w-none rounded-2xl overflow-hidden bg-neutral-300 shadow-xl border border-black/5">
              <img
                src={HERO_IMAGE}
                alt="Aura Collection"
                className="w-full h-full object-cover object-[35%_center] transition-transform duration-700"
              />
              <div className="absolute bottom-3 left-3 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/40">
                <p className="text-[11px] font-bold tracking-wider uppercase">{t("hero.tag")}</p>
              </div>
            </div>
          </div>

        </div>

        {/* 3. Botón de Acción e Información de Cierre */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 pt-4 border-t border-black/10">
          <span className="text-xs text-surface-dark/60 uppercase tracking-wider font-mono">
            [ LIMITED RELEASE • 01/50 ]
          </span>

          <button className="w-full sm:w-auto bg-surface-dark text-light px-8 py-4 rounded-full text-xs font-semibold tracking-widest uppercase hover:bg-neutral-800 transition-all shadow-md active:scale-95">
            {t("hero.cta", "EXPLORE COLLECTION")}
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
              {t('filters.no_results')}
            </p>
          ) : (
            <ProductGrid products={filteredProducts} />
          )}
        </div>
      </section>

    </>
  )
}