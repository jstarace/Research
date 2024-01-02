import { Articles } from "../../reviewPage/types";

import { basicPut } from "../putFunctions";

const theKey = "xau_GFg5Z5eV9zlaSsN75U8gUOsAS6MF5czZ";

const baseUrl = "https://jstarace-s-workspace-ko759t.us-east-1.xata.sh/db/";
const dbName = "research-papers-db:main/";
const level = "tables/";
const tableName = "search_string_results/";
const bulk = "bulk";

export const dynamic = "force-dynamic"; // defaults to auto

export async function POST(theRequest: Articles[]) {
  const url = `${baseUrl}${dbName}${level}${tableName}${bulk}`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${theKey}`,
      },
      body: JSON.stringify({ records: theRequest }),
    });

    // Check if the request was successful
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return Response.json(data);
  } catch (error) {
    // Log the error to the console
    console.error("An error occurred:", error);
  }
}
