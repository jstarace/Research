import { Articles } from "../reviewPage/types";
import { XATA_API } from "@/config";

export const basicPut = async <T>(url: string, body: Articles[]): Promise<T> => {
    console.log("We're in the fetch functions file")
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${XATA_API}`,
      },
      body: JSON.stringify({records: body})
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    return await response.json() as T;
  };