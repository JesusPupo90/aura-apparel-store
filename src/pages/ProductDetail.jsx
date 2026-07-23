import { useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useCart } from "../context/CartContext"
import { formatPrice } from "../utils/currency"
import { optimizeUnsplash } from "../utils/imageOptimizer"
import { Truck, ShieldCheck, Check, ArrowLeft, Package } from "lucide-react"
import products from "../data/products.json"

const EXCHANGE_RATE_COP = 4000

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const { addToCart } = useCart()

  const currentLang = i18n.language?.startsWith("en") ? "en" : "es"

  const product = Array.isArray(products)
    ? products.find((p) => p.id === id)
    : null

  const [selectedSize, setSelectedSize] = useState("")
  const [sizeError, setSizeError] = useState(false)
  const [isAdded, setIsAdded] = useState(false)

  const productName =
    typeof product?.name === "string"
      ? product.name
      : product?.name?.[currentLang] || product?.name?.es || ""

  const categoryKey = product?.category

  const priceUSD = Number(product?.priceUSD) || 0
  const priceCOP = Math.round(priceUSD * EXCHANGE_RATE_COP)
  const formattedCOP = `$ ${priceCOP.toLocaleString("es-CO")} COP`

  const handleAddToCart = () => {
    if (product?.sizes?.length > 0 && !selectedSize) {
      setSizeError(true)
      return
    }
    setSizeError(false)
    setIsAdded(true)
    addToCart(product, selectedSize || product?.sizes?.[0] || "M")
    setTimeout(() => setIsAdded(false), 2000)
  }

  if (!product) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center space-y-6 max-w-md">
          <Package className="mx-auto text-muted" size={64} strokeWidth={1} />
          <h2 className="text-2xl font-bold">
            {t("detail.not_found_title", "Producto no encontrado")}
          </h2>
          <p className="text-sm text-muted">
            {t("detail.not_found_desc", "El producto que buscas no existe o ha sido eliminado.")}
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-surface-dark text-light px-6 py-3 text-sm font-semibold tracking-widest uppercase hover:bg-neutral-800 transition-all active:scale-95"
          >
            <ArrowLeft size={16} strokeWidth={2} />
            {t("detail.back_to_catalog", "Volver a Tienda")}
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-light text-surface-dark py-8 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-2 text-xs tracking-widest uppercase text-surface-dark/60 hover:text-surface-dark transition-colors font-semibold"
        >
          <ArrowLeft size={14} strokeWidth={2} />
          {t("detail.back", currentLang === "en" ? "Back" : "Volver")}
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-7">
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-neutral-200 border border-black/5">
              <img
                src={optimizeUnsplash(product?.images?.primary, 1200)}
                alt={productName}
                className="w-full h-full object-cover"
              />
              {product?.isNew && (
                <span className="absolute top-4 left-4 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/40 text-[11px] font-bold tracking-wider uppercase">
                  {t("hero.tag", currentLang === "es" ? "NUEVO" : "NEW")}
                </span>
              )}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            {categoryKey && (
              <span className="block text-xs text-surface-dark/60 uppercase tracking-widest font-mono font-semibold">
                {t(`filters.${categoryKey}`, categoryKey)}
              </span>
            )}

            <h1 className="text-3xl sm:text-4xl font-black uppercase leading-tight">
              {productName}
            </h1>

            <div className="space-y-1">
              <p className="text-2xl font-bold">{formattedCOP}</p>
              <p className="text-sm text-muted">{formatPrice(priceUSD, currentLang)}</p>
            </div>
            {product?.sizes?.length > 0 && (
              <div className="space-y-3">
                <span className="block text-xs font-semibold tracking-widest uppercase text-surface-dark/70">
                  {t("product.select_size", "Seleccionar Talla")}
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => {
                        setSelectedSize(size)
                        setSizeError(false)
                      }}
                      className={`w-12 h-12 text-xs font-semibold border transition-all active:scale-95 rounded-none ${
                        selectedSize === size
                          ? "border-surface-dark bg-surface-dark text-light"
                          : "border-black/20 text-surface-dark/80 hover:border-surface-dark/50"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {sizeError && (
                  <p className="text-error text-[11px] font-medium">
                    *{t("product.size_required", "Por favor elige una talla")}
                  </p>
                )}
              </div>
            )}

            {product?.sizeGuide && (
              <div className="bg-black/5 p-4 space-y-2 font-mono text-[11px]">
                <span className="block text-[10px] uppercase tracking-widest font-semibold text-surface-dark/70">
                  {t("product.size_guide", "Guía de Medidas")}
                </span>
                <div className="flex gap-8">
                  <div>
                    <span className="text-surface-dark/50">{t("product.chest", "Pecho")}: </span>
                    <span className="font-semibold">
                      {product.sizeGuide[currentLang]?.chest || product.sizeGuide.es?.chest}
                    </span>
                  </div>
                  <div>
                    <span className="text-surface-dark/50">{t("product.length", "Largo")}: </span>
                    <span className="font-semibold">
                      {product.sizeGuide[currentLang]?.length || product.sizeGuide.es?.length}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={handleAddToCart}
              disabled={isAdded}
              className={`w-full py-4 text-xs font-semibold tracking-widest uppercase transition-all active:scale-95 flex items-center justify-center gap-2 rounded-none ${
                isAdded
                  ? "bg-green-600 text-light"
                  : "bg-surface-dark text-light hover:bg-neutral-800"
              }`}
            >
              {isAdded ? (
                <>
                  <Check size={16} strokeWidth={3} />
                  {t("product.added", "Añadido")}
                </>
              ) : (
                t("product.add_to_cart", "Añadir al Carrito")
              )}
            </button>

            <div className="flex flex-col sm:flex-row gap-4 pt-2 border-t border-black/10">
              <div className="flex items-center gap-2 text-[11px] text-surface-dark/60 font-medium">
                <Truck size={16} strokeWidth={1.5} />
                <span>
                  {t(
                    "product.shipping_info",
                    currentLang === "en"
                      ? "Free shipping on orders > $200.000 COP"
                      : "Envío gratis en pedidos > $200.000 COP"
                  )}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-surface-dark/60 font-medium">
                <ShieldCheck size={16} strokeWidth={1.5} />
                <span>
                  {t(
                    "product.guarantee_info",
                    currentLang === "en"
                      ? "Secure payment guaranteed"
                      : "Pago seguro garantizado"
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}