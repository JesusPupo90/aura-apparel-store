/* ==========================================================================
   IMPORTS & CONFIG
   ========================================================================== */

import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"

/* ==========================================================================
   STATE & HOOKS
   ========================================================================== */

export default function Newsletter() {
  const { t } = useTranslation()
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!subscribed) return
    const timer = setTimeout(() => {
      setSubscribed(false)
    }, 4000)
    return () => clearTimeout(timer)
  }, [subscribed])

/* ==========================================================================
   HANDLERS & LOGIC
   ========================================================================== */

  function handleSubmit(e) {
    e.preventDefault()
    setError(false)

    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    if (!isValid) {
      setError(true)
      return
    }

    setSubscribed(true)
    setEmail("")
  }

/* ==========================================================================
   RENDER / JSX
   ========================================================================== */

  return (
    <section className="border-t border-black/10 py-16 px-4 bg-light text-surface-dark">
      <div className="max-w-7xl mx-auto text-center space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight uppercase">
            {t("newsletter.title", "EARLY ACCESS DROPS")}
          </h2>
          <p className="text-sm text-muted max-w-sm mx-auto">
            {t("newsletter.subtitle", "Subscribe to receive limited release notifications.")}
          </p>
        </div>

        {subscribed ? (
          <p className="text-sm font-bold uppercase tracking-widest text-surface-dark animate-pulse">
            {t("newsletter.success", "ACCESS GRANTED")}
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (error) setError(false)
              }}
              placeholder={t("placeholder.email")}
              className={`flex-1 rounded-none border bg-transparent text-sm px-4 py-3 outline-none transition-colors ${
                error
                  ? "border-error"
                  : "border-black/20 focus:border-black"
              }`}
            />
            <button
              type="submit"
              className="bg-surface-dark text-light px-8 py-3 text-xs font-bold uppercase tracking-widest rounded-none hover:bg-neutral-800 transition-all active:scale-95"
            >
              {t("newsletter.cta", "SUBSCRIBE")}
            </button>
          </form>
        )}

        {error && (
          <p className="text-xs text-error font-medium">
            {t("newsletter.error", "Please enter a valid email address.")}
          </p>
        )}
      </div>
    </section>
  )
}
