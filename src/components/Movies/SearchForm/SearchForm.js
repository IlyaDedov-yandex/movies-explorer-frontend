import React from "react";
import './SearchForm.css';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox'
const searchImg = require('../../../images/movies/search-form/_search/search-form_search.png');

function SearchForm() {
    return (
        <section className="search-form">
            <form className="search-form__form">
                <div className="search-form__container">
                    <img className="search-form__image" src={searchImg} alt=""></img>
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