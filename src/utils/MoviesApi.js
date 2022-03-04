class MoviesApi {
    constructor(options) {
        this._baseUrl = options.baseUrl;
    }

    getMovies() {
        return fetch(`${this._baseUrl}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(this._checkResponse)
    }
    _checkResponse(res) {
        if (!res.ok) {
            return Promise.reject(`Что-то пошло не так: ${res.status}`);
        }
        return res.json();
    }
    setUserAvatar(link, token) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: link
            })
        })
            .then(this._checkResponse)
    }
}

export const moviesApi = new MoviesApi({
    baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
});