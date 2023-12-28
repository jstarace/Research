import { NextRequest } from "next/server";
import { OPEN_ACCESS_BASE_URL } from "../../config";
import { basicFetch } from "./fetchFunctions";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  // Check if this is the initial request
  console.log("\n\n\n\n\n\n\n\n\n\n")
  console.log("The initial param is: ", searchParams.get("initial"));
  console.log("The url is: ", req.url);
  console.log("The search params - search: ", searchParams.get("search"));

  const search = searchParams.get("search");

  const endpoint =`${OPEN_ACCESS_BASE_URL}${search}&s=1&p=1`

  console.log("Inital endpoint:", endpoint);
  const data = await basicFetch(endpoint);
  console.log("The data is: ", data);

  return Response.json({ data });
}
