import { gateway } from './index';
import type { GenresItem } from '@/types/genres';
import type { MoviesResult, MovieResultItem } from '@/types/movies';

interface QueryObj {
  page: number;
  with_genres?: string;
  'vote_average.gte'?: number;
  'vote_average.lte'?: number;
}

export const fetchGanres = (): Promise<{ genres: GenresItem[] }> => {
  return gateway('GET', '/genre/movie/list');
};

export const fetchPopularFilms = (payload: QueryObj): Promise<MoviesResult> => {
  return gateway('GET', 'discover/movie', payload);
};

export const searchMovies = (data: string): Promise<MoviesResult> => {
  return gateway('GET', 'search/movie', { query: data });
};

export const fetchMovie = (id: string): Promise<MovieResultItem> => {
  return gateway('GET', `movie/${id}`);
};
