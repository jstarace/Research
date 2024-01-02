export type Result = {
  pageLength: number;
  recordsDisplayed: number;
  start: number;
  total: number;
};

export type SpringerArticles = {
  facets: [];
  query: string;
  records: [];
  result: Result[];
};

export type Author = {
  //ORCID: string | null;
  creator: string;
};

export type Abstract = {
  h1: string | null;
  p: string;
};

export type Articles = {
  doi: string;
  search_id: string;
  title: string;
  content_type: string;
  issue_number: string;
  issue_type: string;
  journal_id: string;
  online_date: datetime;
  publication_date: datetime;
  publication_name: string;
  publication_type: string;
  publisher: string;
  abstract: string;
  subject: [];
  url: string;
  status: boolean | null;
  language: string;
  authors: [];
};
