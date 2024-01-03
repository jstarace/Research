import { basicPut } from "./fetchFunctions";
import { Articles } from "../reviewPage/types";
import { XATA_UPLOAD_ARTICLES_URL } from "@/config";

export const usePutArticles =  async (tempData: any): Promise<any[]> => {
    console.log("We're in the fetch hooks file")
    const url = XATA_UPLOAD_ARTICLES_URL;
  return basicPut(url, tempData);
}