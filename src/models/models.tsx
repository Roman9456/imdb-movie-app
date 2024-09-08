export interface MovieItem {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  favorite?: boolean;
}

export interface MovieDetail {
  Title: string;
  Year: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Actors: string;
  Poster: string;
  Ratings: { Source: string; Value: string }[];
  imdbID: string;
  Type: string;
}

export interface DataState {
  movies: MovieItem[];
  favorite: MovieItem[];
  favoriteId: string[];
  movieDetail: null | MovieDetail;
  isLoading: boolean;
  search: string;
  error: string | null;
}
