import React from "react";
import './MoviesCardList.css';
import Preloader from "../../Movies/Preloader/Preloader";
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
        </section>
    )
}

export default MoviesCardList;