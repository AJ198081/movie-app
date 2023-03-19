// @ts-ignore
import classes from './Movie.module.css';

export interface MovieType {
    id: number;
    title: string;
    releaseDate: string;
    openingText: string;
}

const Movie = ({title, releaseDate, openingText}: MovieType) => {

    return (<li className={classes.movie}>
        <h2>{title}</h2>
        <h3>{releaseDate}</h3>
        <p>{openingText}</p>
    </li>);
 }

 export default Movie;