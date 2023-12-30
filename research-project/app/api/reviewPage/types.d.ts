export type SpringerArticles = {
  facets: [];
  query: string;
  records: [];
  result: [];
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


