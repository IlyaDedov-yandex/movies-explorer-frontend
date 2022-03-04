import React, { useEffect, useState } from "react";
import './SearchForm.css';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox'

function SearchForm({ onSearchFilm, isShortInitial, searchStringInitial, onSearchChange, onShortChange }) {
    function handleFilmChange(e) {
        onSearchChange(e.target.value);
    }
    function handleChange(isChecked) {
        onShortChange(isChecked);
    }
    function handleSubmit(e) {
        e.preventDefault();
        onSearchFilm({ searchString: searchStringInitial, isShort: isShortInitial })
    }
    return (
        <section className="search-form">
            <form className="search-form__form" name="search-movies-form" onSubmit={handleSubmit}>
                <div className="search-form__container">
                    <div className="search-form__image"></div>
                    <input className="search-form__input" name="film" placeholder="Фильм" type="text" value={searchStringInitial} onChange={handleFilmChange} />
                    <button className="search-form__btn" type="submit" aria-label="Поиск фильмов"></button>
                    <div className="search-form__line"></div>
                </div>
                <FilterCheckbox handleChange={handleChange} isShortInitial={isShortInitial} />
            </form>
            <hr className="main-line main-line_color_grey" />
        </section >
    )
}

export default SearchForm;