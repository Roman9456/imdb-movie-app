import {
  Action,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { DataState, MovieDetail, MovieItem } from "../models/models";
import axios from "axios";

const token = import.meta.env.VITE_TOKEN_OMDB;
const connect = axios.create({
  baseURL: `http://www.omdbapi.com/?apikey=${token}&`,
});

const initialState: DataState = {
  movies: [],
  favorite: [],
  favoriteId: [],
  movieDetail: null,
  isLoading: false,
  error: null,
  search: "",
};

interface Answer {
  res: MovieItem[];
  search: string;
}

const removeFromArray = (arr: string[], value: string) => {
  const index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
};

export const getMovies = createAsyncThunk<
  Answer,
  string,
  { rejectValue: string }
>("moves/getMoves", async function (search, { rejectWithValue }) {
  const res = await connect.get(``, { params: { s: search } });

  if (res.data.Response === "False") {
    return rejectWithValue(res.data.Error);
  }

  return { res: res.data.Search, search };
});

export const getMoviesDetail = createAsyncThunk<
  MovieDetail,
  { id: string },
  { rejectValue: string }
>("moves/getMoviesDetail", async function (id, { rejectWithValue }) {
  const res = await connect.get(``, { params: { i: id.id } });

  if (res.data.Response === "False") {
    return rejectWithValue(res.data.Error);
  }

  return res.data;
});

const MovesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<MovieItem>) {
      state.favorite.push(action.payload);
      state.favoriteId.push(action.payload.imdbID);
    },
    removeFavorite(state, action: PayloadAction<MovieItem>) {
      state.favorite = state.favorite.filter(
        (movie) => movie.imdbID != action.payload.imdbID
      );
      removeFromArray(state.favoriteId, action.payload.imdbID);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMovies.fulfilled, (state, action) => {
        state.movies = action.payload.res;
        state.search = action.payload.search;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getMoviesDetail.fulfilled, (state, action) => {
        state.movieDetail = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getMoviesDetail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getMovies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.error = action.payload;
        state.search = "";
      });
  },
});

export const { addFavorite, removeFavorite } = MovesSlice.actions;

export default MovesSlice.reducer;

function isError(action: Action) {
  return action.type.endsWith("rejected");
}
