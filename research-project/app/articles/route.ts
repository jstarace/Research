import { NextResponse, NextRequest } from "next/server";
import { useRouter } from "next/navigation";

import { VERSIONED_BASE_URL, OPEN_ACCESS_BASE_URL } from "../../config";

import { basicFetch } from "../../api/fetchFunctions";
import { redirect } from "next/dist/server/api-utils";

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const url = req.nextUrl.clone();
  // Check if this is the initial request
  console.log("The initial param is: ", searchParams.get("initial"));
  console.log("The url is: ", req.url);
  console.log("The nextUrl is: ", url);
  console.log("The search params - search: ", searchParams.get("search"));

  const search = searchParams.get("search");

  if (search === null) {
    return NextResponse.rewrite(url);
  }

  const endpoint =
    1 === 1
      ? `${OPEN_ACCESS_BASE_URL}${search}test&s=1&p=1`
      : `${VERSIONED_BASE_URL}${search}`;

  console.log("Inital endpoint:", endpoint);
  const data = await basicFetch(endpoint);

  return NextResponse.json({ data });
}
