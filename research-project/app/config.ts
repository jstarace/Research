const API_URL = "https://api.springernature.com/";
const API_KEY = process.env.SPRINGER_API_KEY;

const VERSIONED_BASE_URL = `${API_URL}meta/v2/json?api_key=${API_KEY}&q=`;
const OPEN_ACCESS_BASE_URL = `${API_URL}openaccess/json?api_key=${API_KEY}&q=`;

export { VERSIONED_BASE_URL, OPEN_ACCESS_BASE_URL, API_URL, API_KEY };
