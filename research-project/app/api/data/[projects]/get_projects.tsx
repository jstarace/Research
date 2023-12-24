import type { NextApiRequest, NextApiResponse } from "next";
import { getXataClient } from "../../../../src/xata";

// type Repo = {
//   id: string | null | undefined;
//   name: string | null | undefined;
//   description: string | null | undefined;
//   project_id: number | null | undefined;
//   status: string | null | undefined;
//   start_date: Date | null | undefined;
//   end_date: Date | null | undefined;
//   xata: { createdAt: Date; updatedAt: Date; version: number };
// }[];

const xata = getXataClient();

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  console.log("The actual fuck");
  const projects = await xata.db.project_name.getMany();
  res.status(200).json(projects);
}
