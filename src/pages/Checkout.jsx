import { useState } from "react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useCart } from "../context/CartContext"
import { optimizeUnsplash } from "../utils/imageOptimizer"
import { CheckCircle, ShoppingBag, ArrowLeft, CreditCard, Building, Banknote, Loader } from "lucide-react"

const EXCHANGE_RATE_COP = 4000
const FREE_SHIPPING_THRESHOLD_COP = 200000
const STANDARD_SHIPPING_COP = 15000

function getProductName(product, lang) {
  if (typeof product?.name === "string") return product.name
  return product?.name?.[lang] || product?.name?.es || ""
}

function randomOrderId() {
  const num = Math.floor(10000 + Math.random() * 90000)
  return `AURA-${num}`
}

const PAYMENT_METHODS = [
  { id: "card", icon: CreditCard },
  { id: "pse", icon: Building },
  { id: "cash", icon: Banknote },
]

export default function Checkout() {
  const { t, i18n } = useTranslation()
  const { cartItems: cart, clearCart, totalPriceUSD } = useCart()
  const currentLang = i18n.language?.startsWith("en") ? "en" : "es"

  const [form, setForm] = useState({
    email: "",
    fullName: "",
    address: "",
    city: "",
    phone: "",
  })
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [errors, setErrors] = useState({})
  const [isProcessing, setIsProcessing] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [orderId, setOrderId] = useState("")

  const totalCOP = Math.round(totalPriceUSD * EXCHANGE_RATE_COP)
  const shippingCOP = totalCOP > FREE_SHIPPING_THRESHOLD_COP ? 0 : STANDARD_SHIPPING_COP
  const finalCOP = totalCOP + shippingCOP
  const shippingUSD = +(shippingCOP / EXCHANGE_RATE_COP).toFixed(2)
  const finalUSD = +(finalCOP / EXCHANGE_RATE_COP).toFixed(2)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const validate = () => {
    const newErrors = {}
    if (!form.email.trim()) newErrors.email = true
    if (!form.fullName.trim()) newErrors.fullName = true
    if (!form.address.trim()) newErrors.address = true
    if (!form.city.trim()) newErrors.city = true
    if (!form.phone.trim()) newErrors.phone = true
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    setIsProcessing(true)
    const id = randomOrderId()
    setOrderId(id)
    setTimeout(() => {
      clearCart()
      setIsProcessing(false)
      setIsCompleted(true)
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur()
      }
      window.scrollTo({ top: 0, behavior: "smooth" })
    }, 2500)
  }

  if (cart.length === 0 && !isCompleted) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center space-y-6 max-w-md">
          <ShoppingBag className="mx-auto text-muted" size={64} strokeWidth={1} />
          <h2 className="text-2xl font-bold">
            {t("checkout.empty_title", "Tu carrito está vacío")}
          </h2>
          <p className="text-sm text-muted">
            {t("checkout.empty_desc", "Agrega productos desde nuestro catálogo para continuar.")}
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-surface-dark text-light px-6 py-3 text-sm font-semibold tracking-widest uppercase hover:bg-neutral-800 transition-all active:scale-95"
          >
            <ArrowLeft size={16} strokeWidth={2} />
            {t("checkout.back_to_catalog", "Volver a Tienda")}
          </Link>
        </div>
      </section>
    )
  }

  if (isCompleted) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center space-y-6 max-w-md">
          <CheckCircle className="mx-auto text-green-600" size={64} strokeWidth={1.5} />
          <h2 className="text-2xl font-black uppercase tracking-tight">
            {t("checkout.success_title", "¡Pedido Confirmado!")}
          </h2>
          <p className="text-sm text-muted">
            {t("checkout.success_order", "Tu orden")} <span className="font-mono font-bold text-surface-dark">{orderId}</span>
          </p>
          <p className="text-sm text-muted">
            {t("checkout.success_msg", "Recibirás un correo con los detalles de tu compra y seguimiento del envío.")}
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-surface-dark text-light px-6 py-3 text-sm font-semibold tracking-widest uppercase hover:bg-neutral-800 transition-all active:scale-95"
          >
            {t("checkout.back_to_shop", "Volver a la Tienda")}
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-light text-surface-dark py-8 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mb-8 lg:mb-12">
          {t("checkout.title", "Checkout")}
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-7 space-y-8">
              <fieldset className="space-y-5">
                <legend className="text-xs font-mono font-semibold uppercase tracking-widest text-surface-dark/60 mb-4">
                  {t("checkout.shipping_info", "Información de Envío")}
                </legend>

                <div className="space-y-1">
                  <label className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-surface-dark/60">
                    {t("checkout.email", "Correo electrónico")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className={`w-full border px-4 py-3 text-sm bg-transparent rounded-none outline-none transition-colors ${
                      errors.email
                        ? "border-error"
                        : "border-black/20 focus:border-black"
                    }`}
                    placeholder={t('placeholder.email', 'hola@ejemplo.com')}
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-surface-dark/60">
                    {t("checkout.full_name", "Nombre completo")}
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    className={`w-full border px-4 py-3 text-sm bg-transparent rounded-none outline-none transition-colors ${
                      errors.fullName
                        ? "border-error"
                        : "border-black/20 focus:border-black"
                    }`}
                    placeholder={t("placeholder.full_name", "Juan Pérez")}
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-surface-dark/60">
                    {t("checkout.address", "Dirección de entrega")}
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    className={`w-full border px-4 py-3 text-sm bg-transparent rounded-none outline-none transition-colors ${
                      errors.address
                        ? "border-error"
                        : "border-black/20 focus:border-black"
                    }`}
                    placeholder={t("placeholder.address", "Cra 45 # 23-12")}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-surface-dark/60">
                      {t("checkout.city", "Ciudad")}
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      className={`w-full border px-4 py-3 text-sm bg-transparent rounded-none outline-none transition-colors ${
                        errors.city
                          ? "border-error"
                          : "border-black/20 focus:border-black"
                      }`}
                      placeholder={t("placeholder.city", "Medellín")}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-surface-dark/60">
                      {t("checkout.phone", "Celular / Teléfono")}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className={`w-full border px-4 py-3 text-sm bg-transparent rounded-none outline-none transition-colors ${
                        errors.phone
                          ? "border-error"
                          : "border-black/20 focus:border-black"
                      }`}
                      placeholder={t("placeholder.phone", "+57 300 123 4567")}
                    />
                  </div>
                </div>
              </fieldset>

              <fieldset className="space-y-3">
                <legend className="text-xs font-mono font-semibold uppercase tracking-widest text-surface-dark/60">
                  {t("checkout.payment_method", "Método de pago")}
                </legend>
                <div className="flex flex-wrap gap-3">
                  {PAYMENT_METHODS.map(({ id, icon: Icon }) => (
                    <button
                      type="button"
                      key={id}
                      onClick={() => setPaymentMethod(id)}
                      className={`flex items-center gap-2 px-5 py-3 text-xs font-semibold uppercase tracking-wider border transition-all active:scale-95 ${
                        paymentMethod === id
                          ? "border-surface-dark bg-surface-dark text-light"
                          : "border-black/20 text-surface-dark/70 hover:border-surface-dark/50"
                      }`}
                    >
                      <Icon size={16} strokeWidth={1.5} />
                      {t(`checkout.payment_${id}`, id === "card" ? "Tarjeta" : id === "pse" ? "PSE / Transferencia" : "Contraentrega")}
                    </button>
                  ))}
                </div>
              </fieldset>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="border border-black/10 p-5 space-y-5">
                <span className="block text-xs font-mono font-semibold uppercase tracking-widest text-surface-dark/60">
                  {t("checkout.summary", "Resumen del pedido")}
                </span>

                <div className="space-y-4 divide-y divide-black/5">
                  {cart.map((item, idx) => {
                    const itemCOP = Math.round(Number(item.product.priceUSD) * EXCHANGE_RATE_COP * item.quantity)
                    const itemUSD = Number(item.product.priceUSD) * item.quantity
                    return (
                      <div key={`${item.product.id}-${item.size}-${idx}`} className="flex gap-3 pt-4 first:pt-0">
                        <div className="w-16 h-20 flex-shrink-0 overflow-hidden bg-neutral-200 border border-black/5">
                          <img
                            src={optimizeUnsplash(item.product.images?.primary, 300)}
                            alt={getProductName(item.product, currentLang)}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0 space-y-1">
                          <p className="text-sm font-semibold leading-snug truncate">
                            {getProductName(item.product, currentLang)}
                          </p>
                          <div className="flex gap-3 text-[11px] font-mono text-surface-dark/60">
                            <span>
                              {t("checkout.size", "Talla")}: {item.size}
                            </span>
                            <span>
                              {t("checkout.qty", "Cant")}: {item.quantity}
                            </span>
                          </div>
                          <div className="text-[11px] font-mono">
                            <span className="font-semibold">$ {itemCOP.toLocaleString("es-CO")} COP</span>
                            <span className="text-surface-dark/40 mx-1">/</span>
                            <span className="text-surface-dark/50">${itemUSD.toFixed(2)} USD</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="space-y-2 pt-2 border-t border-black/10 font-mono text-[13px]">
                  <div className="flex justify-between">
                    <span className="text-surface-dark/60">{t("cart.subtotal", "Subtotal")}</span>
                    <span className="font-semibold">$ {totalCOP.toLocaleString("es-CO")} COP</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-surface-dark/60">
                      {t("checkout.shipping", "Envío")}
                      {shippingCOP === 0 && (
                        <span className="ml-2 text-green-600 text-[10px] font-bold uppercase">
                          {t("checkout.free", "Gratis")}
                        </span>
                      )}
                    </span>
                    <span className="font-semibold">
                      {shippingCOP === 0
                        ? "$ 0 COP"
                        : `$ ${shippingCOP.toLocaleString("es-CO")} COP`}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-black/10 text-sm">
                    <span className="font-bold uppercase">{t("checkout.total", "Total")}</span>
                    <div className="text-right">
                      <p className="font-bold">$ {finalCOP.toLocaleString("es-CO")} COP</p>
                      <p className="text-[11px] text-surface-dark/50">${finalUSD.toFixed(2)} USD</p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-surface-dark text-light py-4 text-xs font-bold uppercase tracking-widest rounded-none shadow-md hover:bg-neutral-800 transition-all active:scale-95 disabled:opacity-80 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <Loader size={16} className="animate-spin" />
                    {t("checkout.processing", "PROCESANDO PAGO...")}
                  </>
                ) : (
                  t("cart.place_order", "FINALIZAR COMPRA")
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}
