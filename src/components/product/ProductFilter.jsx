import { useTranslation } from "react-i18next"
import { Search, X } from "lucide-react"

const CATEGORIES = ["all", "outerwear", "tshirts", "accessories"]

export default function ProductFilter({ searchQuery, onSearchChange, activeCategory, onCategoryChange }) {
  const { t } = useTranslation()

  return (
    <div className="space-y-5">
      <div className="relative">
        <Search
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={t("filters.search_placeholder")}
          aria-label={t("filters.search_placeholder")}
          className="w-full pl-10 pr-10 py-2.5 bg-white border border-black/10 rounded-md text-sm text-surface-dark placeholder-muted focus:outline-none focus:border-surface-dark/30 focus:ring-1 focus:ring-surface-dark/10 transition-all"
        />
        
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-surface-dark transition-colors"
            aria-label="Clear search"
          >
            <X size={14} />
          </button>
        )}
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 sm:flex-wrap">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => onCategoryChange(cat)}
            className={`whitespace-nowrap px-4 py-2 rounded-md text-xs font-medium tracking-wide transition-all duration-200 ${
              activeCategory === cat
                ? "bg-surface-dark text-light"
                : "bg-white text-muted border border-black/10 hover:border-surface-dark/30 hover:text-surface-dark"
            }`}
          >
            {t(`filters.${cat}`)}
          </button>
        ))}
      </div>
    </div>
  )
}