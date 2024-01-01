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
import { useEffect, useState } from "react";
import React from "react";
import { Author, Articles, SpringerArticles } from "@/app/api/reviewPage/types";
import { ApprovalIcon } from "./icons";
import { articleColumns, statusOptions } from "./data";

interface PaperTableProps {
  data: SpringerArticles | null;
}

const statusColorMap = {
  pendingReview: "warning",
  approved: "success",
  rejected: "error",
};

const INITIAL_VISIBLE_COLUMNS = ["title", "date", "type", "action"];

export const PaperTable: React.FC<PaperTableProps> = ({ data }) => {
  const [articles, setArticles] = useState<Articles[]>([]);
  const [totalArticles, setTotalArticles] = useState(0);
  const [finalQuery, setFinalQuery] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "date",
    direction: "ascending",
  });

  useEffect(() => {
    //As implied, if data is empty we do nothing else here, just jump out of the function
    if (!data) return;
    // If there is data we want to print the data to the console until we're sure we're grabbing all that we need
    console.log("Data is: ", data.query);
    const articles: Articles[] = data.records.map((article: any) => ({
      abstract: article.abstract,
      contentType: article.contentType,
      language: article.language,
      authors: article.creators || [],
      title: article.title,
      publicationName: article.publicationName,
      doi: article.doi,
      publisher: article.publisher,
      publisherName: article.publisherName,
      publicationDate: article.publicationDate,
      publicationType: article.publicationType,
    }));
    if (data?.result?.length > 0) {
      console.log("Data results are: ", data.result[0].total);
      setTotalArticles(data.result[0].total);
    }
    setArticles(articles);
    setFinalQuery(data.query);
  }, [data]);

  /*
    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = React.useMemo(() => {
        if (visibleColumns === "all") return columns;
    
        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
      }, [visibleColumns]);


      const sortedItems = React.useMemo(() => {
        return [...items].sort((a, b) => {
          const first = a[sortDescriptor.column];
          const second = b[sortDescriptor.column];
          const cmp = first < second ? -1 : first > second ? 1 : 0;
    
          return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
      }, [sortDescriptor, items]);
*/
  if (articles.length !== 0) {
    return (
      <>
        <div className="text-center text-3x1 my-10">
          <h1>
            Your search for &quot;{finalQuery}&quot; returned: {totalArticles}
            results
          </h1>
        </div>
        <Table
          color="primary"
          selectionMode="single"
          defaultSelectedKeys={[-1]}
          aria-label="A table displaying the search results"
        >
          <TableHeader>
            <TableColumn>Title</TableColumn>
            <TableColumn>Author</TableColumn>
            <TableColumn>DOI</TableColumn>
            {/* <TableColumn>Approval</TableColumn> */}
          </TableHeader>
          <TableBody isLoading>
            {articles.map((article) => (
              <TableRow key={article.doi}>
                <TableCell className="break-words overflow-auto max-w-xs">
                  {article.title}
                </TableCell>
                <TableCell>
                  {article.authors.map((author, index) => (
                    <div key={index}>{author.creator}</div>
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

//export default PaperTable;
