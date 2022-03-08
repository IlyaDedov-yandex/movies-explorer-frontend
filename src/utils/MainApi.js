export const BASE_URL = 'https://api.movies.practicum.nomoredomains.work';
const checkResponse = response => {
    return response.ok ? response.json() : Promise.reject(response.json());
}
export const register = (email, password, name) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, name })
    })
        .then(res => {
            if (!res.ok)
                return Promise.reject(res.json());
            return (res);
        })
};

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(res => {
            if (!res.ok)
                return Promise.reject(res.json());
            return (res);
        })
}
export const signout = () => {
    return fetch(`${BASE_URL}/signout`, {
        method: 'GET',
        credentials: 'include',
    })
        .then(res => { return res.ok })
}

export const createMovie = ({ country, director, duration, year, description, image, trailerLink, thumbnail, movieId, nameRU, nameEN }) => {
    return fetch(`${BASE_URL}/movies`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ country, director, duration, year, description, image, trailerLink, thumbnail, movieId, nameRU, nameEN })
    })
        .then(checkResponse);
}
export const getMovies = () => {
    return fetch(`${BASE_URL}/movies`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(checkResponse)
}

export const getUserInfo = () => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(checkResponse)
}
export const updateUserInfo = (name, email) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email })
    })
        .then(checkResponse)
}

export const deleteMovie = (movieId) => {
    return fetch(`${BASE_URL}/movies/${movieId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(checkResponse);
}