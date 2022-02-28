import React from "react";
import './SearchForm.css';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox'

function SearchForm() {
    return (
        <section className="search-form">
            <form className="search-form__form">
                <div className="search-form__container">
                    <div className="search-form__image"></div>
                    <input required className="search-form__input" name="film" placeholder="Фильм" type="text" />
                    <button className="search-form__btn" type="submit" aria-label="Поиск фильмов"></button>
                    <div className="search-form__line"></div>
                </div>
                <FilterCheckbox />
            </form>
            <hr className="main-line main-line_color_grey" />
        </section >
    )
}

export default SearchForm;