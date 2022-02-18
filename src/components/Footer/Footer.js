import React from "react";
import './Footer.css';
function Footer() {
    return (
        <footer className="footer">
            <div className="footer__container centered-block">
                <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
                <hr className="main-line main-line_color_grey" />
                <div className="footer__bottom-part">
                    <p className="footer__copyright">&copy; 2022</p>
                    <nav className="footer__navigation">
                        <li><a className="footer__link textlink-hover-effect" href="https://practicum.yandex.ru" target="_blank" rel="noopener noreferrer">Яндекс.Практикум</a></li>
                        <li><a className="footer__link textlink-hover-effect" href="https://github.com" target="_blank" rel="noopener noreferrer">Github</a></li>
                        <li><a className="footer__link textlink-hover-effect" href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                    </nav>
                </div>
            </div>
        </footer>

    )
}

export default Footer;