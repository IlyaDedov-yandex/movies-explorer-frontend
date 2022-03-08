import React from "react";
import { withRouter } from 'react-router-dom';
import './SavedMovies.css';
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import SearchForm from "../Movies/SearchForm/SearchForm";

function SavedMovies({ savedMovies, foundedMovies, onDeleteClick, header: Header, footer: Footer, onSearchSavedFilm, isShortSavedInitial, searchStringSavedInitial, onSearchSavedChange, onShortSavedChange }) {
    return (
        <>
            <Header />
            <main className="movies">
                <div className="movies__wrapper">
                    <SearchForm onSearchFilm={onSearchSavedFilm} isShortInitial={isShortSavedInitial} searchStringInitial={searchStringSavedInitial} onSearchChange={onSearchSavedChange} onShortChange={onShortSavedChange} />
                    <MoviesCardList films={(foundedMovies.length > 0) ? foundedMovies : savedMovies} onDeleteClick={onDeleteClick} />
                </div>
            </main >
            <Footer />
        </>
        // !(foundedMovies.length > 0) ? foundedMovies :
    )
}

export default withRouter(SavedMovies);