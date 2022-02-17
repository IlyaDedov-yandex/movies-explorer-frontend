import React from "react";
import { withRouter } from 'react-router-dom';
import './SavedMovies.css';
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import SearchForm from "../Movies/SearchForm/SearchForm";

function SavedMovies({ films }) {
    return (
        <main className="movies">
            <div className="movies__wrapper">
                <SearchForm />
                <MoviesCardList films={films} />
            </div>
        </main >
    )
}

export default withRouter(SavedMovies);