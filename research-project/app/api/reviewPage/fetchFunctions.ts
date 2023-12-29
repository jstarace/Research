//import {OPEN_ACCESS_BASE_URL} from "../../config";
//const API_URL = "https://api.springernature.com/";
//const API_KEY = process.env.SPRINGER_API_KEY;

export const basicFetch = async <Response>(
  endpoint: string
): Promise<Response> => {
  const response = await fetch(endpoint);
  if (!response.ok) throw new Error(`Error! ${response?.statusText}`);
  const data = await response.json();
  console.log("The data here is: ", data);
  
  return data;
};
