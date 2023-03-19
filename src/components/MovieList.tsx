import Movie, {MovieType} from "./Movie";
import './MoviesList.module.css';

interface MovieListProps {
    movies: MovieType[];
}

const MovieList = ({movies}: MovieListProps) => {

    return (<ul className={'movies-list'}>
        {movies.map(movie => (
            <Movie key={movie.id} id={movie.id} title={movie.title} releaseDate={movie.releaseDate} openingText={movie.openingText}/>
        ))}
    </ul>);
}

export default MovieList;