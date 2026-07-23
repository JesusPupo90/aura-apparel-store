/* ==========================================================================
   CONFIG & LOGIC
   ========================================================================== */

const EXCHANGE_RATE_COP = 4000;

export const formatPrice = (amountInUSD, language = 'en') => {
  const numericAmount = Number(amountInUSD);
  if (isNaN(numericAmount) || numericAmount < 0 || amountInUSD === null || amountInUSD === undefined) {
    return language === 'es' ? '$ 0 COP' : '$0.00';
  }

  if (language === 'es') {
    const amountCOP = Math.round(numericAmount * EXCHANGE_RATE_COP);
    return `$ ${amountCOP.toLocaleString('es-CO')} COP`;
  }

  return `$${numericAmount.toFixed(2)}`;
};
