import React, { ChangeEvent, useState } from "react";
import { Input } from "@nextui-org/react";
import { SearchIcon } from "./icons";


// This is new so remove if needed.
type Props={
  setQuery: React.Dispatch<React.SetStateAction<string>>
}

export type SearchProps = {
  onSearch: (value: string) => void;
};

export const Search = (props: SearchProps) => {
  const { onSearch } = props;
  const placeholder = "Enter search string";
  const [value, setValue] = useState("");

  const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    setValue(target.value);
    // Fetch to api here
    
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearch(value);
    }
  };

  const clearHandler = () => {
    console.log("clear");
    setValue("");
  };

  return (
    <>
      <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mt-10">
        <Input
          isClearable
          color="primary"
          className="w-full"
          type="search"
          size="sm"
          label="Search"
          labelPlacement="outside"
          value={value}
          placeholder={placeholder}
          onChange={searchHandler}
          onKeyDown={handleKeyDown}
          onClear={clearHandler}
          description="Enter the search string that will be used to search all databases."
          startContent={<SearchIcon />}
        />
      </div>
    </>
  );
};
