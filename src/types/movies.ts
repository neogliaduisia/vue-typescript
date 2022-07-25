export interface MovieResultItem {
  title: string;
  id: number;
  [propName: string]: any;
}

export interface MoviesResult {
  page: number;
  total_pages: number;
  total_results: number;
  results: MovieResultItem[];
}
