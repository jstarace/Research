import { NextRequest } from "next/server";
import { OPEN_ACCESS_BASE_URL } from "../../config";
import { basicFetch } from "./fetchFunctions";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search");
  const endpoint =`${OPEN_ACCESS_BASE_URL}${search}&s=1&p=1`
  const data = await basicFetch(endpoint);
 

  return Response.json({ data });
}
