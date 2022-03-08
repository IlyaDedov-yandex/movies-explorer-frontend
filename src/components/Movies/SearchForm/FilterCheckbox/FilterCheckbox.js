import React, { useState } from "react";
import './FilterCheckbox.css';
function FilterCheckbox({ handleChange, isShortInitial }) {

    function handleInputChange(evt) {
        const value = evt.target.type === 'checkbox' ? evt.target.checked : evt.target.value;
        handleChange(value);
    }

    return (
        <div className="filter-checkbox" >
            <input className="filter-checkbox__input" type="checkbox" name="isGoing" id="filter-checkbox" checked={isShortInitial}
                onChange={handleInputChange} />
            <label htmlFor="filter-checkbox" className="filter-checkbox__label"></label>
            <p className="filter-checkbox__caption">Короткометражки</p>
        </div>
    );
}
export default FilterCheckbox;