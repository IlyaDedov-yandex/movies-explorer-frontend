import React from 'react';
import { Link } from 'react-router-dom';

import './PageNotFound.css';

function PageNotFound() {
    return (
        <div className="wrapper wrapper_type_long">
            <h3 className="not-found__title">
                <span>404</span>
            </h3>
            <p className="not-found__text">
                Страница не найдена
            </p>
            <Link className="not-found__btn" to="/">Назад</Link>
        </div>
    )
}

export default PageNotFound; 