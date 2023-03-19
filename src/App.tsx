import React, {useEffect, useRef, useState} from 'react';
import {MovieType} from "./components/Movie";
import MovieList from "./components/MovieList";
// @ts-ignore
import * as classes from './App.css';
import {fetchMovies} from "./FetchMovies";
import AddMovie from "./components/AddMovie";

function App() {
    const [dummyMovies, setDummyMovies] = useState<MovieType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<ErrorOptions>({});
    const firstTimeRender = useRef<boolean>(true);

    const moviesUrl = 'http://localhost:3500/movies';

    useEffect(() => {
        console.log('Run useEffect');
        if (firstTimeRender.current) {
            fetchMovies(setIsLoading, setDummyMovies, setError)();
            firstTimeRender.current = false;
        }
        return () => {
            console.log('clean up');
        };
    }, []);

    const addMovieHandler = (movie: MovieType) => {
        console.log(movie);
        fetch(moviesUrl, {
            method: 'POST',
            body: JSON.stringify(movie),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

  return (
      <React.Fragment>
          <section className={classes.section}>
          <AddMovie addMovieHandler={addMovieHandler} />
          </section>
        <section className={classes.section}>
          <button className={classes.button} onClick={fetchMovies(setIsLoading, setDummyMovies, setError)}>Fetch Movies</button>
        </section>
        <section className={classes.section}>
            {!isLoading && dummyMovies.length > 0 && <MovieList movies={dummyMovies} />}
            {!isLoading && dummyMovies.length === 0 && <p>No movies to display..</p>}
            {isLoading && <p>Loading movies...</p>}
            {!isLoading && error.cause !== undefined && <p>{`Error...${error.cause}`}</p>}
        </section>
      </React.Fragment>
  );
}

export default App
