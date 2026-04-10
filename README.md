# Victory Independent Living Web App

A responsive React web application for housing intake and partner recruitment in Valdosta, GA.

## Features

- **Lead Capture**: Directed flows for Tenants (`/apply`) and Partners (`/partners`).
- **Google Forms Integration**: Embeds and links with automatic UTM parameter appending.
- **AI Local Insights**: Powered by Google Gemini (Search & Maps) to help users find local resources.
- **Responsive UI**: Built with Tailwind CSS for mobile and desktop.

## Configuration

1.  **Google Forms**: Open `src/config.ts` and replace the placeholder URLs with your actual Google Form links.
    ```typescript
    export const APPLY_FORM_URL = "YOUR_TENANT_FORM_URL";
    export const PARTNER_FORM_URL = "YOUR_PARTNER_FORM_URL";
    ```
2.  **Contact Info**: Update `src/config.ts` with your email and phone number.

## Gemini API Setup

To enable the "Local Insights" AI features:

1.  Get an API Key from [Google AI Studio](https://aistudio.google.com/).
2.  Create a `.env` file in the project root.
3.  Add the key:
    ```
    VITE_GEMINI_API_KEY=your_api_key_here
    ```

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

## Deployment

This app uses `HashRouter`, making it compatible with any static hosting provider (Hostinger, Apache, GitHub Pages, Netlify) without complex server configuration.

1.  Build the app: `npm run build`
2.  Upload the contents of the `dist` folder to your public_html or web root.
