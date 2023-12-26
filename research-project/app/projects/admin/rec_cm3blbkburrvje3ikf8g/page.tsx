"use client";

import { useEffect } from "react";
import { title } from "@/components/primitives";
import { Search } from "@/components/search";
import { useState } from "react";

export default function ReviewPaperAdminPage() {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (value: string) => {
    console.log(value);
    setSearchValue(value);
  };

  return (
    <>
      <div>
        <h1 className={title()}>Review Paper</h1>
      </div>

      <Search onSearch={handleSearch} />
    </>
  );
}
