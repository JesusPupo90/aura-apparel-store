/* ==========================================================================
   LOGIC
   ========================================================================== */

export const optimizeUnsplash = (url, width=800) => {
    if (!url || typeof url !== 'string' || !url.includes('images.unsplash.com')) {
        return url;
    }

    const baseUrl = url.split("?")[0];
  return `${baseUrl}?auto=format&fit=crop&w=${width}&q=80`;
};
