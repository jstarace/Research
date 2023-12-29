//import { useInfiniteQuery } from "@tanstack/react-query";
import { basicFetch } from "./fetchFunctions";
import { SpringerArticles } from "./types";
//import { OPEN_ACCESS_BASE_URL } from "../../config";

export const FetchSpringerArticles = async (search: string): Promise<SpringerArticles> => {
  console.log("The hook:", search);
  const theBase = "https://api.springernature.com/"
  const theEndpoint ="openaccess/json?api_key="
  const theKey =  "9900ecb471637a9b06e400761e712149"
  
  const URL = `${theBase}${theEndpoint}${theKey}&q=${search}&s=1&p=100`;
  const testArt: SpringerArticles = await basicFetch(URL);
  

  return testArt;
  
  //return basicFetch(URL);
};
