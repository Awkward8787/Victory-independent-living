export const SITE_NAME = "Victory Independent Living";
export const CITY = "Valdosta, Georgia";

// Replace these with actual Google Form URLs
export const APPLY_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfD_PLACEHOLDER_FORM_ID/viewform";
export const PARTNER_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfD_PLACEHOLDER_PARTNER_ID/viewform";

export const CONTACT_EMAIL = "info@victoryindependentliving.com";
export const CONTACT_PHONE = "(229) 555-0123";
export const RESPONSE_TIME_TEXT = "We typically respond within 24–48 hours.";

export const FOUNDERS = {
  names: "Valisa Jones and Anthony Jones",
  role: "Spearheaded by"
};

// UTM Generator Helper
export const getFormUrlWithUtm = (baseUrl: string, campaign: string): string => {
  try {
    const url = new URL(baseUrl);
    url.searchParams.append('utm_source', 'victory_il');
    url.searchParams.append('utm_medium', 'web');
    url.searchParams.append('utm_campaign', campaign);
    return url.toString();
  } catch (e) {
    return baseUrl; // Fallback if URL is invalid (e.g., placeholder)
  }
};
