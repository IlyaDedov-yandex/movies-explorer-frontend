import React from "react";
import './AboutProject.css';
function AboutProject() {
    return (
        <section className="main-about-project">
            <div className="about-project centered-block">
                <h2 className="main-subtitle">О проекте</h2>
                <hr className="main-line" />
                <div className="about-project__container">
                    <div className="about-project__element">
                        <h3 className="about-project__subtitle">Дипломный проект включал 5 этапов</h3>
                        <p className="about-project__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности&nbsp;и&nbsp;финальные доработки.</p>
                    </div>
                    <div className="about-project__element">
                        <h3 className="about-project__subtitle">На выполнение диплома ушло 5 недель</h3>
                        <p className="about-project__text">У каждого этапа был мягкий и жёсткий дедлайн,&nbsp;которые&nbsp;нужно было соблюдать,&nbsp;чтобы успешно защититься.</p>
                    </div>
                </div>
                <div className="about-project__progress-block">
                    <div className="about-project__progress-element">
                        <span className="about-project__progress about-project__progress_green">1 неделя</span>
                        <span className="about-project__progress-caption">Back-end</span>
                    </div>
                    <div className="about-project__progress-element about-project__progress-element_long">
                        <p className="about-project__progress">4 недели</p>
                        <p className="about-project__progress-caption">Front-end</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutProject;