import React from "react";
import Preloader from '../Preloader/Preloader';
import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ films }) {
    return (
        <section className="movies-card-container">
            {
                films.length > 0 ?
                    <ul className="movies-card-list">
                        {films.map((film, i) => <MoviesCard film={film} key={i} />)}
                    </ul > : <Preloader />
            }
            <p className="movies-card-list__btn">Еще</p>
        </section>
    )
}

export default MoviesCardList;