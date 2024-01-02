"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
} from "@nextui-org/react";
import { use, useEffect, useState } from "react";
import React from "react";
import { Author, Articles, SpringerArticles } from "@/app/api/reviewPage/types";
import { ApprovalIcon } from "./icons";
import { articleColumns, statusOptions } from "./data";

interface PaperTableProps {
  data: Articles[] | null;
  searchId: string;
}

const statusColorMap = {
  pendingReview: "warning",
  approved: "success",
  rejected: "error",
};

const INITIAL_VISIBLE_COLUMNS = ["title", "date", "type", "action"];

export const PaperTable: React.FC<PaperTableProps> = ({ data, searchId }) => {
  useEffect(() => {
    if (!data) return;
    console.log("Data is: ", data);
    console.log("made it to paperTable");
  }, [data]);

  if (data && data.length !== 0) {
    return (
      <>
        <Table
          color="primary"
          selectionMode="single"
          defaultSelectedKeys={[-1]}
          aria-label="A table displaying the search results"
          className="mt-10"
        >
          <TableHeader>
            <TableColumn>No.</TableColumn>
            <TableColumn>Title</TableColumn>
            <TableColumn>Author</TableColumn>
            <TableColumn>DOI</TableColumn>
            {/* <TableColumn>Approval</TableColumn> */}
          </TableHeader>
          <TableBody isLoading>
            {data.map((article, index) => (
              <TableRow key={article.doi}>
                <TableCell> {index + 1} </TableCell>
                <TableCell className="break-words overflow-auto min-w-1/4">
                  {article.title}
                </TableCell>
                <TableCell>
                  {article.authors.map((author, index) => (
                    <div key={index}>{author}</div>
                  ))}
                </TableCell>
                <TableCell>{article.doi}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </>
    );
  }
  return (
    <>
      <Table aria-label="Table display search results ">
        <TableHeader>
          <TableColumn>Title</TableColumn>
          <TableColumn>Author</TableColumn>
          <TableColumn>DOI</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"Enter a search string"}>{[]}</TableBody>
      </Table>
    </>
  );
};
