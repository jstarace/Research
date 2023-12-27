"use client";

import { useEffect } from "react";
import { title } from "@/components/primitives";
import { Search } from "@/components/search";
import { useState } from "react";
import { useFetchSpringerArticles } from "@/api/fetchHooks";

export default function ReviewPaperAdminPage() {
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!searchValue) return;
    const { data } = useFetchSpringerArticles(searchValue);
    setData(data);
  }, [searchValue]);

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  return (
    <>
      <div>
        <h1 className={title()}>Review Paper</h1>
      </div>
      <div>
        <h1>fuck off</h1>
      </div>
      <Search onSearch={handleSearch} />
    </>
  );
}
