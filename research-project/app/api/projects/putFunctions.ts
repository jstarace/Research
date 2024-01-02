"use server";

import { XATA_API_KEY } from "@/app/config";
import { Articles } from "../reviewPage/types"; // Add missing import statement

export const basicPut = async (theRequest: Articles[]) => {
  console.log("Does it make it here?");
  console.log("the key from the function", XATA_API_KEY);
};
