export type SpringerArticles = {
  results: Articles[];
  total_pages: number;
};

export type Articles = {
  query: string;
  language: string;
  authors: [];
  title: string;
  publicationName: string;
  doi: string;
  publisher: string;
  publisherName: string;
  publicationDate: string;
  publicationType: string;
  abstract: [];
}