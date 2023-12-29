"use client";

import { useEffect } from "react";
import { title } from "@/components/primitives";
import { Search } from "@/components/search";
import { useState } from "react";
import { FetchSpringerArticles } from "../../api/reviewPage/fetchHooks"
import { Articles, SpringerArticles } from "../../api/reviewPage/types"
import { PaperTable } from "@/components/paperTable";
import { Divider } from "@nextui-org/divider";

export default function Review() { 
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState<SpringerArticles | null>(null);


  useEffect(() => {
    if (!searchValue) return;
    const fetchData = async () => {
      const result: SpringerArticles = await FetchSpringerArticles(searchValue);
      setData(result);
    };
    fetchData();
  }, [searchValue]);


  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  return (
    <>
      <div className="flex justify-center items-center w-full">
        <h1 className={title()}>Review Paper</h1>
      </div>
      <Divider className="my-4 w-full" />
      <Search onSearch={handleSearch} />
      <PaperTable data={data} />
    </>
  );
}
