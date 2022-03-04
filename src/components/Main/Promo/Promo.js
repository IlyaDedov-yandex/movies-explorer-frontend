import React from "react";
import './Promo.css';
import promoVectorImg from '../../../images/main/promo/promo_vector.png';

function Promo() {
    return (
        <section className="main-promo">
            <div className="promo centered-block">
                <div className="promo__text-block">
                    <h1 className="promo__title">Учебный проект студента факультета Веб&#8209;разработки.</h1>
                    <h2 className="promo__subtitle">Листайте ниже, чтобы узнать больше про&nbsp;этот проект и его создателя.</h2>
                    <button className="promo__button" type="button" aria-label="Узнать больше">Узнать больше</button>
                </div>
                <img className="promo__image" src={promoVectorImg} alt="Логотип проекта" />
            </div>
        </section>
    )
}

export default Promo;
