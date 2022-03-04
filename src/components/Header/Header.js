import React from "react";
import { Link } from 'react-router-dom';
import './Header.css';
function handleMenuClick() {
    let menu = document.querySelector('.header__burger');
    let subMenu = document.querySelector('.header__content');
    let popup = document.querySelector('.popup');
    menu.classList.toggle('active');
    subMenu.classList.toggle('responsive');
    popup.classList.toggle('popup_opened');

}
function Header({ headerType }) {
    if (headerType === 'main')
        return (
            <header className="header">
                <nav className="header__navigation centered-block">
                    <Link to="/" className="logo" />
                    <ul className="header__container">
                        <li><Link to="/signup" className="header__link">Регистрация</Link></li>
                        <li><Link to="/signin" className="header__link header__link_type_active">Войти</Link></li>
                    </ul>
                </nav>
            </header>
        )
    else
        return (
            <header className="header_custom">
                <nav className="header__navigation  header_custom__navigation centered-block">
                    <Link to="/" className="logo" />
                    <div className="header__content">
                        <ul className="header__nav-links">
                            <li><Link to="/" className="header__link header__link_type_normal header__link_type_hidden textlink-hover-effect">Главная</Link></li>
                            <li><Link to="/movies" className="header__link header__link_type_normal textlink-hover-effect">Фильмы</Link></li>
                            <li><Link to="/saved-movies" className="header__link header__link_type_normal textlink-hover-effect">Сохранённые фильмы</Link></li>
                        </ul>
                        <ul className="header__container">
                            <li><Link to="/profile" className="header__link header__link_type_custom">Аккаунт</Link></li>
                        </ul>
                        <button onClick={handleMenuClick} className="header__burger" aria-label="Main Menu">
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>

                </nav>
            </header>
        )
}

export default Header;