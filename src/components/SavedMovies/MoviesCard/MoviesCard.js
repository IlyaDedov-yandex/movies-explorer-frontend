import React from "react";
import minutesToHM from "../../../utils/MinutesToHM"
import './MoviesCard.css';
function MoviesCard({ film, onDeleteClick }) {
    const handleImageClick = () => {
        window.open(film.trailerLink);
    };
    const handleMovieDelete = () => {
        onDeleteClick(film._id)
    }
    return (
        <li className="movies-card">
            <div className="movies-card__info-container">
                <h2 className="movies-card__name">{film.nameRU}</h2>
                <p className="movies-card__duration">{minutesToHM(film.duration)}</p>
                <button className="movies-card__btn movies-card__btn_type_delete" type="button" aria-label="Удалить фильм" onClick={handleMovieDelete}></button>
            </div>
            <img className="movies-card__image" src={film.image} alt={film.name} onClick={handleImageClick} />
        </li>

    )
}

export default MoviesCard;