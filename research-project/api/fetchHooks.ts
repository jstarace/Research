import { useInfiniteQuery } from "@tanstack/react-query";

import { basicFetch } from "./fetchFunctions";

import { SpringerArticles } from "./types";

export const useFetchSpringerArticles = (search: string) => {
  console.log("The hook:", search);

  return basicFetch(`${search}&s=1&p=1`);
};
