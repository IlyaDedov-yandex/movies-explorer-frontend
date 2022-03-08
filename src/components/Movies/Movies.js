import React from "react";
import { withRouter } from 'react-router-dom';
import './Movies.css';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from "./MoviesCardList/MoviesCardList";


function Movies({ notFoundFilmsMessage, onMovieLike, onMovieDislike, handleSearchFilm, isShort, searchString, onSearchChange, onShortChange, showedFilms, handleMoreMoviesClick, showMoreBtn, savedMovies, header: Header, footer: Footer }) {
    return (
        <>
            <Header />
            <main className="movies">
                <SearchForm onSearchFilm={handleSearchFilm} isShortInitial={isShort} searchStringInitial={searchString} onSearchChange={onSearchChange} onShortChange={onShortChange} />
                <MoviesCardList films={showedFilms} onMovieDislike={onMovieDislike} handleMoreMoviesClick={handleMoreMoviesClick} showMoreBtn={showMoreBtn} onMovieLike={onMovieLike} savedMovies={savedMovies} notFoundFilmsMessage={notFoundFilmsMessage} />
            </main >
            <Footer />
        </>
    )
}

export default withRouter(Movies);