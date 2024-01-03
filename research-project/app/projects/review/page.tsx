"use client";

import { useEffect } from "react";
import { title } from "@/components/primitives";
import { Search } from "@/components/search";
import { useState } from "react";
import { FetchSpringerArticles } from "../../api/reviewPage/fetchHooks";
import { Articles, SpringerArticles } from "../../api/reviewPage/types";
import { PaperTable } from "@/components/paperTable";
import { Divider } from "@nextui-org/divider";
import { getXataClient } from "@/src/xata";
import { useAuth } from "@clerk/nextjs";
import { POST } from "@/app/api/projects/review/route";
import { usePutArticles } from "@/app/api/projects/fetchHooks";

const xata = getXataClient();

export default function Review() {
  const [searchValue, setSearchValue] = useState("");
  const [searchId, setSearchId] = useState("");
  const [newSearchId, setNewSearchId] = useState("");
  const [tempData, setTempData] = useState<Articles[] | null>(null);
  const [articles, setArticles] = useState<Articles[]>([]);

  const [data, setData] = useState<Articles[] | null>(null);

  const { userId } = useAuth();

  // This useEffect will check xata to see if the search term has been used before
  // If it hasn't it will create a new record and return the id, then search apis
  // If it has it will return the stored results from xata
  useEffect(() => {
    // make sure we have the necessary items to do a search
    if (!searchValue) return;
    if (!userId) return;

    // Here's the confusion
    const fetchSearchData = async () => {
      //First we search xata for the search term
      const prevSearch = await xata.db.search_string.search(searchValue, {
        target: ["search_term"],
        fuzziness: 0,
      });
      //If the search term doesn't exist we create it
      if (prevSearch.records.length === 0) {
        const record = await xata.db.search_string.create({
          search_term: searchValue,
          user_c_id: userId,
        });
        console.log(
          "The search has NOT been performed before, here's the ID: ",
          record.id
        );
        setNewSearchId(record.id);
      } else {
        //If the search term does exist we grab the id
        const firstRecord = prevSearch.records[0];
        console.log(
          "The search has been performed before, here's the ID: ",
          firstRecord.id
        );
        setSearchId(firstRecord.id);
      }
    };
    fetchSearchData();
  }, [searchValue]);

  // This useEffect will search the springer api for the search term
  useEffect(() => {
    if (!newSearchId) return;
    console.log("The search id is: ", newSearchId);
    const fetchData = async () => {
      const result: SpringerArticles = await FetchSpringerArticles(searchValue);
      console.log("The results are: ", result);
      setTempData(
        result.records.map((record: any) => ({
          search_id: newSearchId,
          content_type: record.contentType,
          issue_number: record.issn,
          issue_type: record.issueType,
          doi: record.doi,
          title: record.title,
          journal_id: record.journalId,
          online_date: new Date(record.onlineDate),
          publication_date: new Date(record.publicationDate),
          publication_name: record.publicationName,
          publication_type: record.publicationType,
          publisher: record.publisher,
          url: record.url[0].value,
          volume_number: record.volume,
          authors: record.creators.map((creator: any) => creator.creator),
          abstract: Array.isArray(record.abstract.p)
            ? record.abstract.p.join(" ")
            : record.abstract.p,
          subject: record.subjects,
          status: null,
          language: record.language,
        }))
      );
    };
    fetchData();
  }, [newSearchId]);

  // This useEffect will upload the search results to xata
  useEffect(() => {
    if (!tempData) return;
    console.log("Now we're going to send to xata:");
    const UploadData = async () => {
      const result = await usePutArticles(tempData);
      //const result = await POST(tempData);
      console.log("The result is: ", result);
      if(result && result.length > 0){
        setSearchId(newSearchId);
      }
      // if (result) {
      //   console.log("The status of the result is: ", result.ok);
      //   if (result.ok) {
      //     setSearchId(newSearchId);
      //   }
      // }
    };
    UploadData();
  }, [tempData]);

  // This useEffect will search xata for the search id and return the results
  useEffect(() => {
    if (!searchId) return;
    const fetchData = async () => {
      const result = await xata.db.search_string_results
        .filter({ search_id: searchId })
        .getAll();

      if (result) {
        setData(
          result.map((record: any) => ({
            search_id: record.search_id,
            content_type: record.content_type,
            issue_number: record.issn,
            issue_type: record.issue_type,
            doi: record.doi,
            title: record.title,
            journal_id: record.journal_id,
            online_date: record.online_date,
            publication_date: record.publication_date,
            publication_name: record.publication_name,
            publication_type: record.publication_type,
            publisher: record.publisher,
            url: record.url,
            volume_number: record.volume,
            authors: record.authors,
            abstract: record.abstract,
            subject: record.subject,
            status: record.status,
            language: record.language,
          }))
        );
      }
    };
    fetchData();
  }, [searchId]);

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
      <PaperTable data={data} searchId={searchId} />
    </>
  );
}
