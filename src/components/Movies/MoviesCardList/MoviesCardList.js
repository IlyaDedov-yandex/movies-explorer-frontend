import React from "react";
import Preloader from '../Preloader/Preloader';
import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";
function MoviesCardList({ films, handleMoreMoviesClick, showMoreBtn, onMovieLike, onMovieDislike, savedMovies, notFoundFilmsMessage }) {
    return (
        <section className="movies-card-container">
            {
                films.length > 0 ?
                    <>
                        <ul className="movies-card-list">
                            {
                                films.map((film, i) =>
                                    <MoviesCard film={film} onMovieLike={onMovieLike} onMovieDislike={onMovieDislike} savedMovies={savedMovies} key={i} />)}
                        </ul >
                        {showMoreBtn && <p className="movies-card-list__btn" onClick={() => handleMoreMoviesClick()}>Еще</p>}
                    </> : <p className="movies-card-list__error">{notFoundFilmsMessage}</p>
            }

        </section>
    )
}

export default MoviesCardList;