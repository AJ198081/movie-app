import React, {useState} from 'react';
import {MovieType} from "./components/Movie";
import MovieList from "./components/MovieList";
// @ts-ignore
import * as classes from './App.css';

function App() {

    const [dummyMovies, setDummyMovies] = useState<MovieType[]>([]);

    function fetchMoviesHandler() {

        fetch('https://swapi.dev/api/films/', {
            method: 'GET'
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(data => {
                const transformedMovies = data.results.map((movieData: { episode_id: number; title: string; release_date: string; opening_crawl: string; }) => {
                    return {
                        id: movieData.episode_id,
                        title: movieData.title,
                        releaseDate: movieData.release_date,
                        openingText: movieData.opening_crawl
                    } as MovieType;
                })
                setDummyMovies(transformedMovies);

            })
            .catch(error => console.log(error.message.toString()));
    }

    console.log(dummyMovies);

  return (
      <React.Fragment>
        <section className={classes.section}>
          <button className={classes.button} onClick={fetchMoviesHandler}>Fetch Movies</button>
        </section>
        <section className={classes.section}>
          <MovieList movies={dummyMovies} />
        </section>

      </React.Fragment>
  );
}

export default App
