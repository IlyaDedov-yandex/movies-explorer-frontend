import React from "react";
import './Techs.css';
function Techs() {
    return (
        <section className="main-techs">
            <div className="techs centered-block">
                <h2 className="main-subtitle">Технологии</h2>
                <hr className="main-line" />
                <h3 className="techs__title centered-block">7 технологий</h3>
                <p className="techs__subtitle centered-block">На курсе веб-разработки мы освоили технологии, которые применили в&nbsp;дипломном проекте.</p>
                <ul className="techs__list">
                    <li className="techs__element">HTML</li>
                    <li className="techs__element">CSS</li>
                    <li className="techs__element">JS</li>
                    <li className="techs__element">React</li>
                    <li className="techs__element">Git</li>
                    <li className="techs__element">Express.js</li>
                    <li className="techs__element">mongoDB</li>

                </ul>
            </div>
        </section>

    )
}

export default Techs;