import React from "react";
import avatarImg from '../../../images/main/about-me/about-me_avatar.png';
import './AboutMe.css';
function AboutMe() {
    return (
        <section className="main-portfolio">
            <div className="about-me centered-block">
                <h2 className="main-subtitle">Студент</h2>
                <hr className="main-line" />
                <div className="about-me__container">
                    <div className="about-me__info-block">
                        <h3 className="about-me__name">Виталий</h3>
                        <h4 className="about-me__profession">Фронтенд-разработчик, 30 лет</h4>
                        <p className="about-me__text">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
                            и&nbsp;дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015&nbsp;года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
                        <ul className="about-me__links">
                            <li><a className="about-me__link" href="http://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                            <li><a className="about-me__link" href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                        </ul>
                    </div>
                    <img className="about-me__avatar" src={avatarImg} alt="Аватар в портфолио" />
                </div>
            </div>
        </section>
    )
}

export default AboutMe;