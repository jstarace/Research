export type Result = {
  pageLength: number;
  recordsDisplayed: number;
  start: number;
  total: number;
}

export type SpringerArticles = {
  facets: [];
  query: string;
  records: [];
  result: Result[];
};

export type Author = {
  ORCID: string | null;
  creator: string;
}

export type Articles = {
  abstract: [];
  contentType: string;
  language: string;
  authors: Author[];
  title: string;
  publicationName: string;
  doi: string;
  publisher: string;
  publisherName: string;
  publicationDate: string;
  publicationType: string;
  
}


