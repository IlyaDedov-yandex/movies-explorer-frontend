import React, { useState, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { moviesApi } from '../utils/MoviesApi';
import ProtectedRoute from './ProtectedRoute';
import useWindowDimensions from "../utils/WindowsDimention";
import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import Movies from './Movies/Movies';
import SavedMovies from './SavedMovies/SavedMovies';
import Login from './Login/Login';
import Register from './Register/Register';
import Profile from './Profile/Profile';
import PageNotFound from './PageNotFound/PageNotFound';
import Popup from './Popup/Popup';
import InfoPopup from './InfoPopup/InfoPopup';
import * as mainApi from '../utils/MainApi';

function App() {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState({ name: '', email: '' });
  const [registerStatus, setRegisterStatus] = useState({ message: '', status: false });
  const [loggedIn, setLoggedIn] = useState(false);
  const [movies, setMovies] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  const [foundedMovies, setFoundedMovies] = useState([]);
  const [searchString, setSearchString] = useState('');
  const [isShort, setIsShort] = useState(true);
  const [searchSavedString, setSearchSavedString] = useState('');
  const [isSavedShort, setIsSavedShort] = useState(true);
  const { width } = useWindowDimensions();
  const [numberToShow1, setNumberToShow1] = useState(7);
  const [numberToShow2, setNumberToShow2] = useState(5);
  const [showMoreBtn, setShowMoreBtn] = useState(true);
  const [errorMessage, setErrorMessage] = useState({ message: '', status: '' });
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [notFoundFilmsMessage, setNotFoundFilmsMessage] = useState('Ничего не найдено');

  useEffect(() => {
    checkAuthorized();
  }, []);

  function checkAuthorized() {
    mainApi.getUserInfo()
      .then((user) => {
        setCurrentUser(user);
        setLoggedIn(true);
        history.push('/');
      })
      .catch((err) => { err.then(er => console.log(er)) })
  }

  useEffect(() => {
    getInitialSavedMovies();
    getInitialMovies();
    mainApi.getUserInfo()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((err) => { err.then(er => console.log(er)) })
  }, [loggedIn]);

  useEffect(() => {
    localStorage.setItem('moviesInfo', JSON.stringify({ 'searchString': searchString, 'shortFilms': isShort, 'movies': movies }));
    movies.length < 7 ? setShowMoreBtn(false) : setShowMoreBtn(true);
  }, [searchString, isShort, movies]);

  let showedFilms = [];
  if (width >= 480) {
    if (movies.length > 0)
      showedFilms = movies.slice(0, numberToShow1);
  }
  else if (width > 320 & width < 480) {
    if (movies.length > 0)
      showedFilms = movies.slice(0, numberToShow2);
  }


  function handleMoreMoviesClick() {
    if (numberToShow1 + 7 > movies.length || numberToShow2 + 5 > movies.length) {
      setShowMoreBtn(false);
    }
    if (width >= 480) {
      setNumberToShow1(numberToShow1 + 7);
    }
    else if (width > 320 & width < 480) {
      setNumberToShow2(numberToShow2 + 5);
    }
  }

  function getInitialMovies() {
    const retrievedObject = localStorage.getItem('moviesInfo');
    if (retrievedObject) {
      const filtredMovies = JSON.parse(retrievedObject);
      setMovies(filtredMovies.movies);
      setSearchString(filtredMovies.searchString);
      setIsShort(filtredMovies.shortFilms);
    }
  }
  function handleSearchFilm({ searchString, isShort }) {
    moviesApi.getMovies()
      .then((movies) => {
        if (movies) {
          let filtredMovies = movies.filter(movie => movie.nameRU.includes(searchString));
          if (isShort) {
            filtredMovies = filtredMovies.filter(movie => movie.duration < 40);
          }
          setMovies(filtredMovies);
          setSearchString(searchString);
          setIsShort(isShort);
          localStorage.setItem('moviesInfo', JSON.stringify({ 'searchString': searchString, 'shortFilms': isShort, 'movies': filtredMovies }));
        }
      })
      .catch(() => { setNotFoundFilmsMessage('«Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз».') });
  }
  function onSearchChange(searchString) {
    setSearchString(searchString);
  }
  function onShortChange(isChecked) {
    setIsShort(isChecked);
  }
  function onSearchSavedFilm() {
    let filtredMovies = savedMovies.filter(movie => movie.nameRU.includes(searchSavedString));
    if (isSavedShort) {
      filtredMovies = filtredMovies.filter(movie => movie.duration < 40);
    }
    setFoundedMovies(filtredMovies);
  }
  function onSearchSavedChange(searchString) {
    setSearchSavedString(searchString);
  }
  function onShortSavedChange(isChecked) {
    setIsSavedShort(isChecked);
  }
  function onMovieLike(movie) {
    mainApi.createMovie({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: `https://api.nomoreparties.co${movie.image.url}`,
      trailerLink: movie.trailerLink,
      thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    })
      .then(getInitialSavedMovies())
      .catch((err) => { err.then(er => { handleError(er.message, 'false'); }) });
  }
  function onMovieDislike(movie) {
    const movieId = savedMovies.find(({ movieId }) => movieId === movie.id)._id;
    if (movieId) {
      mainApi.deleteMovie(movieId)
        .then(() => { getInitialSavedMovies() })
        .catch((err) => { err.then(er => { handleError(er.message, 'false'); }) });
    }
  }

  function getInitialSavedMovies() {
    mainApi.getMovies()
      .then((movies) => {
        setSavedMovies(movies);
      })
      .catch((err) => { err.then(er => { setSavedMovies([]) }) });
  }

  function onDeleteClick(movieId) {
    mainApi.deleteMovie(movieId)
      .then((movie) => { setSavedMovies((state) => state.filter((c) => c._id !== movie._id)); })
      .catch((err) => { err.then(er => { handleError(er.message, 'false'); }) });
  }
  function handleUpdateUserInfo(name, email) {
    mainApi.updateUserInfo(name, email)
      .then(res => {
        setCurrentUser(res);
        handleError('Данные успешно обновлены', 'true');
      })
      .catch((err) => { err.then(er => { handleError(er.message, 'false'); }) });
  }

  function handleRegister(email, password, name) {
    mainApi.register(email, password, name)
      .then((res) => {
        if (res.name) {
          setLoggedIn(true);
          history.push('/movies');
          setRegisterStatus({ message: 'Вы успешно зарегистрировались!', status: 'true' });
        }
      })
      .catch((err) => {
        err.then((res) => {
          setRegisterStatus({ message: res.message, status: 'false' })
        })
      })
  }

  function handleLogin(email, password) {
    mainApi.authorize(email, password)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          history.push('/movies');
        }
      })
      .catch((err) => { err.then(er => { handleError(er.message, 'false') }) });
  }

  function handleSignOut() {
    mainApi.signout()
      .then(() => {
        localStorage.removeItem('moviesInfo');
        setCurrentUser({ name: '', email: '' });
        setMovies([]);
        setSearchString('');
        setIsShort(true);
        setLoggedIn(false);
        history.push('/');
      })
  }

  function handleError(err, status) {
    setErrorMessage({ message: err, status: status });
    setIsInfoPopupOpen(true);
  }
  function closeAllPopups() {
    setIsInfoPopupOpen(false);
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route exact path="/">
            <Header headerType="main" loggedIn={loggedIn} />
            <Main />
            <Footer />
          </Route>
          <Route path="/signup">
            <Register handleRegister={handleRegister} registerStatus={registerStatus} />
          </Route>
          <Route path="/signin">
            <Login handleLogin={handleLogin} />
          </Route>
          <ProtectedRoute path="/movies" loggedIn={loggedIn} component={Movies} header={Header} footer={Footer} notFoundFilmsMessage={notFoundFilmsMessage} onMovieLike={onMovieLike} onMovieDislike={onMovieDislike} handleSearchFilm={handleSearchFilm} isShort={isShort} searchString={searchString} onSearchChange={onSearchChange} onShortChange={onShortChange} showedFilms={showedFilms} handleMoreMoviesClick={handleMoreMoviesClick} showMoreBtn={showMoreBtn} savedMovies={savedMovies} />
          <ProtectedRoute path="/saved-movies" loggedIn={loggedIn} component={SavedMovies} header={Header} footer={Footer} savedMovies={savedMovies} foundedMovies={foundedMovies} onDeleteClick={onDeleteClick} onSearchSavedFilm={onSearchSavedFilm} isShortSavedInitial={isSavedShort} searchStringSavedInitial={searchSavedString} onSearchSavedChange={onSearchSavedChange} onShortSavedChange={onShortSavedChange} />
          <ProtectedRoute path="/profile" loggedIn={loggedIn} component={Profile} header={Header} name={currentUser.name} email={currentUser.email} handleSignOut={handleSignOut} handleUpdateUserInfo={handleUpdateUserInfo} />
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
        <Popup />
        <InfoPopup isOpen={isInfoPopupOpen} onClose={closeAllPopups} registerStatus={errorMessage} />
      </div>
    </CurrentUserContext.Provider>

  );
}

export default App;
