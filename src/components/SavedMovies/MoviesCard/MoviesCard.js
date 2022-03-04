import React from "react";
import './MoviesCard.css';
function MoviesCard({ film }) {
    return (
        <li className="movies-card">
            <div className="movies-card__info-container">
                <h2 className="movies-card__name">{film.name}</h2>
                <p className="movies-card__duration">{film.duration}</p>
                <button className="movies-card__btn movies-card__btn_type_delete" type="button" aria-label="Удалить фильм"></button>
            </div>
            <img className="movies-card__image" src={film.image} alt={film.name} />
        </li>

    )
}

export default MoviesCard;