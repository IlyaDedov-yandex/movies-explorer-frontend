import React, { useEffect, useState } from "react";
import minutesToHM from "../../../utils/MinutesToHM"
import './MoviesCard.css';
function MoviesCard({ film, onMovieLike, onMovieDislike, savedMovies }) {
    const [isLiked, setIsLiked] = useState(false);
    const [disabled, setDisabled] = useState(false);
    useEffect(() => {
        checkMovieInSaveMovies();
    }, [savedMovies, onMovieLike]);

    function checkMovieInSaveMovies() {
        const result = savedMovies.find(({ movieId }) => movieId === film.id);
        result ? setIsLiked(true) : setIsLiked(false);
        setDisabled(false);
    }
    const handleImageClick = () => {
        window.open(film.trailerLink);
    };
    function handleLikeClick() {
        setDisabled(true);
        isLiked ? onMovieDislike(film) : onMovieLike(film);
    }
    return (
        <li className="movies-card">
            <div className="movies-card__info-container">
                <div>
                    <h2 className="movies-card__name">{film.nameRU}</h2>
                    <p className="movies-card__duration">{minutesToHM(film.duration)}</p>
                </div>
                <button className={isLiked ? `movies-card__btn movies-card__btn_type_liked` : `movies-card__btn movies-card__btn_type_disliked`} type="button" aria-label="Поставить лайк" onClick={handleLikeClick} disabled={disabled}></button>
            </div>
            <img className="movies-card__image" src={`https://api.nomoreparties.co${film.image.url}`} alt={film.nameRU} onClick={handleImageClick} />
        </li>

    )
}

export default MoviesCard;