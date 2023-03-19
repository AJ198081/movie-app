import React, {useRef} from "react";
// @ts-ignore
import classes from './AddMovie.module.css';
import {MovieType} from "./Movie";

interface AddMovieProps {
    addMovieHandler: React.Dispatch<MovieType>;
}

const AddMovie = ({addMovieHandler}: AddMovieProps) => {

    const titleRef = useRef<HTMLInputElement>(null);
    const openingTextRef = useRef<HTMLTextAreaElement>(null);
    const releaseDateRef = useRef<HTMLInputElement>(null);

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const movie = {
            id: Math.ceil(Math.random() * 99999),
            title: titleRef.current!.value,
            openingText: openingTextRef.current!.value,
            releaseDate: releaseDateRef.current!.value
        }

        if (titleRef.current !== null && openingTextRef.current !== null && releaseDateRef.current !== null) {
            addMovieHandler(movie);
        }
    };
    return (<form onSubmit={submitHandler}>
        <div className={classes.control}>
            <label htmlFor="title">Title</label>
            <input type="text" id={'title'} ref={titleRef}/>
        </div>
        <div className={classes.control}>
            <label htmlFor="opening-text">Opening Text</label>
            <textarea name="openingText" id="opening-text" ref={openingTextRef}></textarea>
        </div>
        <div className={classes.control}>
            <label htmlFor="date">Release Date</label>
            <input type="text" id={'date'} ref={releaseDateRef}/>
        </div>
        <button type={"submit"}>Add Movie</button>
    </form>);
}

export default AddMovie;