import {MovieType} from "./components/Movie";

export function fetchMovies(setIsLoading: (value: (((prevState: boolean) => boolean) | boolean)) => void, setDummyMovies: (value: (((prevState: MovieType[]) => MovieType[]) | MovieType[])) => void, setError: (value: (((prevState: ErrorOptions) => ErrorOptions) | ErrorOptions)) => void) {
    return () => {
        setIsLoading(true);
        fetch('https://swapi.dev/api/films/', {
            method: 'GET'
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    setIsLoading(false);
                    throw new Error('Unable to fetch data!!', {
                        cause: response.status
                    });
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
                });
                setIsLoading(false);
                setDummyMovies(transformedMovies);
            })
            .catch(error =>
                       setError({
                                    cause: error.cause,
                                })
            );
    };
}