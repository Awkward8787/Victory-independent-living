export const SITE_NAME = "Victory Independent Living";
export const CITY = "Valdosta, Georgia";

// --- Contact ---
export const CONTACT_EMAIL = "info@victoryindependentliving.com";
export const CONTACT_PHONE = "(229) 444-3576";
export const CONTACT_PHONE_ALT = "(229) 946-8905";
export const RESPONSE_TIME_TEXT = "We typically respond within 24–48 hours.";

// --- Founders ---
export const FOUNDERS = {
  names: "Valisa Jones and Anthony Jones",
  role: "Spearheaded by"
};

// --- Pricing ---
// Update PLACEMENT_FEE when your fee structure is finalized
export const PLACEMENT_FEE = "Contact us for details";

// --- Form Submission Endpoints (Formspree) ---
// 1. Sign up free at https://formspree.io
// 2. Create a form, copy the endpoint URL
// 3. Replace the placeholder below with your real endpoint
export const APPLY_FORM_ENDPOINT = "https://formspree.io/f/REPLACE_WITH_YOUR_APPLY_FORM_ID";
export const PARTNER_FORM_ENDPOINT = "https://formspree.io/f/REPLACE_WITH_YOUR_PARTNER_FORM_ID";

// --- UTM Tracking Helper ---
export const getFormUrlWithUtm = (baseUrl: string, campaign: string): string => {
  try {
    const url = new URL(baseUrl);
    url.searchParams.append('utm_source', 'victory_il');
    url.searchParams.append('utm_medium', 'web');
    url.searchParams.append('utm_campaign', campaign);
    return url.toString();
  } catch (e) {
    return baseUrl;
  }
};
