const API_URL = "https://api.springernature.com/";
const API_KEY = process.env.SPRINGER_API_KEY;
const XATA_API_KEY = process.env.XATA_API_KEY;
const XATA_BRANCH = process.env.XATA_BRANCH;

const XATA_SLUG = "https://jstarace-s-workspace-ko759t.us-east-1.xata.sh/db/";
const XATA_TABLE = "research-papers-db:";
const VERSIONED_BASE_URL = `${API_URL}meta/v2/json?api_key=${API_KEY}&q=`;
const OPEN_ACCESS_BASE_URL = `${API_URL}openaccess/json?api_key=${API_KEY}&q=`;

const XATA_BASE_URL = `${XATA_SLUG}${XATA_TABLE}${XATA_BRANCH}`;

export {
  VERSIONED_BASE_URL,
  OPEN_ACCESS_BASE_URL,
  API_URL,
  API_KEY,
  XATA_API_KEY,
  XATA_BASE_URL,
};
