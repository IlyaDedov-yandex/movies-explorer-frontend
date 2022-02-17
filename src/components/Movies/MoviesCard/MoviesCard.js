import React from "react";
import './MoviesCard.css';
function MoviesCard({ film }) {
    const cardLikeButtonClassName = film.isLiked ? 'movies-card__btn_type_liked' : 'movies-card__btn_type_disliked';
    return (
        <li className="movies-card">
            <div className="movies-card__info-container">
                <div>
                    <h2 className="movies-card__name">{film.name}</h2>
                    <p className="movies-card__duration">{film.duration}</p>
                </div>
                <div className={`movies-card__btn ${cardLikeButtonClassName}`}></div>
            </div>
            <img className="movies-card__image" src={film.image} alt={film.name} />
        </li>

    )
}

export default MoviesCard;