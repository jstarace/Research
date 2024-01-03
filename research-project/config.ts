
// Springer data
const API_URL = "https://api.springernature.com/";
const API_KEY = process.env.SPRINGER_API_KEY;
const VERSIONED_BASE_URL = `${API_URL}meta/v2/json?api_key=${API_KEY}&q=`;
const OPEN_ACCESS_BASE_URL = `${API_URL}openaccess/json?api_key=${API_KEY}&q=`;


// XATA Data
const XATA_API = process.env.XATA_API_KEY;
const XATA_SLUG = process.env.XATA_URL;
const XATA_UPLOAD_ARTICLES = "research-papers-db:main/tables/search_string_results/bulk";
const XATA_UPLOAD_ARTICLES_URL = `${XATA_SLUG}${XATA_UPLOAD_ARTICLES}`;







export {
  VERSIONED_BASE_URL,
  OPEN_ACCESS_BASE_URL,
  API_URL,
  API_KEY,
  XATA_SLUG,
  XATA_API,
  XATA_UPLOAD_ARTICLES_URL,
};
