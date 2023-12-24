import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { getXataClient } from "../../../src/xata";

type Repo = {
  id: string | null | undefined;
  name: string | null | undefined;
  description: string | null | undefined;
  project_id: number | null | undefined;
  status: string | null | undefined;
  start_date: Date | null | undefined;
  end_date: Date | null | undefined;
  xata: { createdAt: Date; updatedAt: Date; version: number };
}[];

export const getServerSideProps = (async () => {
  // Fetch data from external API
  const xata = getXataClient();
  const res = await xata.db.project_name.getAll();
  const repo: Repo = await JSON.parse(JSON.stringify(res));
  // Pass data to the page via props
  return { props: { repo } };
}) satisfies GetServerSideProps<{ repo: Repo }>;

export default function Page({
  repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return repo;
}
