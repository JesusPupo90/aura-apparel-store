import { useTranslation } from "react-i18next"

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="w-full border-t border-surface-dark/20 bg-light backdrop-blur-md py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm text-surface-dark/70 font-poppins">
          {t("footer.dev_prefix")}{" "}
          <span className="brand-contrast font-semibold">
            {t("footer.dev_name")}
          </span>
          {" • "}
          {t("footer.dev_studio")}
        </p>
      </div>
    </footer>
  )
}
