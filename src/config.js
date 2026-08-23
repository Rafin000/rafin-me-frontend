// Base URL for static assets that aren't stored in the DB (logo, header image).
// Override via Vite env var; default is the production GCS prefix.
const ASSETS_BASE_URL =
  import.meta.env.VITE_ASSETS_BASE_URL ||
  "https://storage.googleapis.com/rafin-portfolio-assets/rafin-assets";

export const URLs = {
  logo: `${ASSETS_BASE_URL}/logo.png`,
  profile_picture: `${ASSETS_BASE_URL}/profile-img01.png`,
  header: `${ASSETS_BASE_URL}/header.png`,
};

// API is always served from the same origin, reverse-proxied by nginx
// (works for local docker-compose AND production VM behind a single host)
export const API_BASE_URL = "/api/v1";
