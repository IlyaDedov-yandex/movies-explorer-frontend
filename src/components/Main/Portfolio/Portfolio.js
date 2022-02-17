import React from "react";
import './Portfolio.css';
function Portfolio() {
    return (
        <section className="main-portfolio">
            <div className="portfolio centered-block">
                <h2 className="portfolio__title">Портфолио</h2>
                <div className="portfolio__link-container">
                    <h3 className="portfolio__link-caption">Статичный сайт</h3>
                    <a className="portfolio__link" href="https://mestoproject.students.nomoredomains.rocks/" target="_blank" rel="noopener noreferrer"></a>
                </div>
                <hr className="main-line main-line_color_grey" />
                <div className="portfolio__link-container">
                    <h3 className="portfolio__link-caption">Адаптивный сайт</h3>
                    <a className="portfolio__link" href="https://mestoproject.students.nomoredomains.rocks/" target="_blank" rel="noopener noreferrer"></a>
                </div>
                <hr className="main-line main-line_color_grey" />
                <div className="portfolio__link-container">
                    <h3 className="portfolio__link-caption">Одностраничное приложение</h3>
                    <a className="portfolio__link" href="https://mestoproject.students.nomoredomains.rocks/" target="_blank" rel="noopener noreferrer"></a>
                </div>
            </div>
        </section>
    )
}

export default Portfolio;