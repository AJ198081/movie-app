import React, {useState} from 'react';
import {MovieType} from "./components/Movie";
import MovieList from "./components/MovieList";
// @ts-ignore
import * as classes from './App.css';
import {fetchMovies} from "./FetchMovies";

function App() {

    const [dummyMovies, setDummyMovies] = useState<MovieType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<ErrorOptions>({});


    const fetchMoviesHandler = fetchMovies(setIsLoading, setDummyMovies, setError);


    const errorMessage = `Error...${error.cause}`;


  return (
      <React.Fragment>
        <section className={classes.section}>
          <button className={classes.button} onClick={fetchMoviesHandler}>Fetch Movies</button>
        </section>
        <section className={classes.section}>
            {!isLoading && dummyMovies.length > 0 && <MovieList movies={dummyMovies} />}
            {!isLoading && dummyMovies.length === 0 && <p>No movies to display..</p>}
            {isLoading && <p>Loading movies...</p>}
            {!isLoading && error.cause !== undefined && <p>{errorMessage}</p>}
        </section>
      </React.Fragment>
  );
}

export default App
