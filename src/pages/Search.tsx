import React, { useEffect, useState } from "react";
import { getMovies } from "../redux/MoviesSlice";
import Movie from "../components/Move";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { useAppDispatch, useAppSelector } from "../models/hook";
import '../css/Search.css'

export default function Search() {
  const dispatch = useAppDispatch();
  const movies = useAppSelector((state) => state.data.movies);
  const isLoading = useAppSelector((state) => state.data.isLoading);
  const error = useAppSelector((state) => state.data.error);
  const [text, setText] = useState("");
  const search = useAppSelector((state) => state.data.search);

  useEffect(() => {
    setText(search);
  }, [search]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <form
        className="search-form"
        onSubmit={(evt) => {
          evt.preventDefault();
          const target = evt.target as HTMLFormElement;
          if (target.search_input.value.trim()) {
            dispatch(getMovies(target.search_input.value));
          }
        }}
      >
        <input
          type="text"
          id="search_input"
          value={text}
          onChange={(e: React.ChangeEvent) => {
            const target = e.target as HTMLFormElement;
            setText(target.value);
          }}
        />
        <button>Search</button>
      </form>
      {error ? (
        <ErrorMessage error={error} />
      ) : (
        <div className="search_list">
          {movies.map((movie) => (
            <Link to={`/movies/${movie.imdbID}`} key={movie.imdbID}>
              <Movie movie={movie} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
