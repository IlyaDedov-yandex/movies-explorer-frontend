import React from "react";
import { withRouter } from 'react-router-dom';
import './Movies.css';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from "./MoviesCardList/MoviesCardList";

function Movies({ films }) {
    return (
        <main className="movies">
            <SearchForm />
            <MoviesCardList films={films} />
        </main >
    )
}

export default withRouter(Movies);