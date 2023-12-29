"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { useEffect, useState } from "react";
import React from "react";
import { Articles, SpringerArticles } from "@/app/api/reviewPage/types";



interface PaperTableProps {
    data: SpringerArticles | null;
  }

export const PaperTable: React.FC<PaperTableProps> = ({data}) => {

    const [articles, setArticles] = useState<Articles[]>([]);
    
    useEffect(() => {
    if (!data) return;
    console.log("Data is: ", data.query);
    const articles: Articles[] = data.records.map((article: any) => ({
        abstract: article.abstract,
        contentType: article.contentType,
        language: article.language,
        authors: article.authors,
        title: article.title,
        publicationName: article.publicationName,
        doi: article.doi,
        publisher: article.publisher,
        publisherName: article.publisherName,
        publicationDate: article.publicationDate,
        publicationType: article.publicationType,

    }));
    setArticles(articles);
    }, [data]);

  if(articles.length !== 0){
    return (
        <>
            <Table>
            <TableHeader>
                <TableColumn>Title</TableColumn>
                <TableColumn>Author</TableColumn>
                <TableColumn>DOI</TableColumn>
            </TableHeader>
            <TableBody>
                {articles.map((article) => (
                    <TableRow key={article.doi}>
                        <TableCell>{article.title}</TableCell>
                        <TableCell>{article.authors}</TableCell>
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