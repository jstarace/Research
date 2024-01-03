import { NextResponse } from "next/server";
import { XATA_API, XATA_UPLOAD_ARTICLES_URL } from "@/config";


export async function POST(req: Request) {
  console.log("We're in the toure file")
  const res = await fetch(XATA_UPLOAD_ARTICLES_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${XATA_API}`,
    },
    body: JSON.stringify({ records: req.body }),
  });

  // Check if the request was successful
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const data = await res.json();
  return NextResponse.json(data);
}

// export async function POST(req: Request){

// console.log(XATA_API_KEY)
// console.log("the URL is: ", XATA_BASE_URL)

// }



// import { Articles } from "../../reviewPage/types";

// export const dynamic = "force-dynamic"; // defaults to auto

// export async function POST(theRequest: Articles[]) {
//   try {
//     const res = await fetch(XATA_UPLOAD_ARTICLES_URL, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${XATA_API}`,
//       },
//       body: JSON.stringify({ records: theRequest }),
//     });

//     // Check if the request was successful
//     if (!res.ok) {
//       throw new Error(`HTTP error! status: ${res.status}`);
//     }

//     const data = await res.json();
//     return Response.json(data);
//   } catch (error) {
//     // Log the error to the console
//     console.error("An error occurred:", error);
//   }
// }
