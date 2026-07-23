/* ==========================================================================
   IMPORTS & CONFIG
   ========================================================================== */

import { useTranslation } from "react-i18next"

/* ==========================================================================
   RENDER / JSX
   ========================================================================== */

export default function BrandManifesto() {
  const { t } = useTranslation()

  return (
    <section className="bg-surface-dark text-light py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto text-center space-y-10">
        <div className="space-y-4">
          <span className="inline-block text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-white/40">
            {t("manifesto.badge", "[ ARCHIVE PHILOSOPHY • 2026 ]")}
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tighter uppercase">
            <span>{t("manifesto.title_line1", "ESSENTIAL SILHOUETTES")}</span>
            <span className="block text-white/30">/</span>
            <span>{t("manifesto.title_line2", "HEAVYWEIGHT FABRICS")}</span>
            <span className="block text-white/30">/</span>
            <span>{t("manifesto.title_line3", "CONCEPTUAL DESIGN")}</span>
          </h2>
        </div>

        <p className="text-sm sm:text-base text-white/60 max-w-2xl mx-auto leading-relaxed font-light">
          {t("manifesto.body", "At AURA, every piece is conceived for durability and minimalism. Heavyweight fabrics, clean construction, and timeless form — no logos, no trends. Just pure, functional design built to outlast the season.")}
        </p>

        <div className="pt-4">
          <span className="inline-block text-[10px] font-mono uppercase tracking-[0.25em] text-white/30 border border-white/10 px-4 py-2">
            {t("manifesto.footer_tag", "DESIGNED FOR ENDURANCE")}
          </span>
        </div>
      </div>
    </section>
  )
}
