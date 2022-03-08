import React, { useState, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { moviesApi } from '../utils/MoviesApi';
import ProtectedRoute from './ProtectedRoute';
import AuthProtectedRoute from './AuthProtectedRoute'
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
import Preloader from './Movies/Preloader/Preloader';
import * as mainApi from '../utils/MainApi';
import { SHORT_MOVIES_DURATION, MAX_NUMBER_OF_MOVIES, MIN_NUMBER_OF_MOVIES, STORAGE_NAME, ERR_STATUS_FALSE, ERR_STATUS_SUCCESS, MOVIE_IMAGE_HOST } from '../utils/constants/constants';


function App() {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [registerStatus, setRegisterStatus] = useState({ message: '', status: false });
  const [loggedIn, setLoggedIn] = useState(false);
  const [allMovies, setAllMovies] = useState([]);
  const [movies, setMovies] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  const [foundedMovies, setFoundedMovies] = useState([]);
  const [searchString, setSearchString] = useState('');
  const [isShort, setIsShort] = useState(true);
  const [searchSavedString, setSearchSavedString] = useState('');
  const [isSavedShort, setIsSavedShort] = useState(true);
  const { width } = useWindowDimensions();
  const [numberToShow1, setNumberToShow1] = useState(MAX_NUMBER_OF_MOVIES);
  const [numberToShow2, setNumberToShow2] = useState(MIN_NUMBER_OF_MOVIES);
  const [showMoreBtn, setShowMoreBtn] = useState(true);
  const [errorMessage, setErrorMessage] = useState({ message: '', status: '' });
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [notFoundFilmsMessage, setNotFoundFilmsMessage] = useState('');
  const [isInputDisabled, setIsInputDisabled] = useState(false);

  useEffect(() => {
    checkAuthorized();
  }, []);

  function checkAuthorized() {
    getInitialMoviesFromServer();
    mainApi.getUserInfo()
      .then((user) => {
        setCurrentUser(user);
        setLoggedIn(true);
        setLoading(false);
      })
      .catch((err) => {
        setLoggedIn(false);
        setLoading(false);
      })
  }

  useEffect(() => {
    getInitialSavedMovies();
    getInitialMoviesFromStorage();
    mainApi.getUserInfo()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((err) => { err.then(er => console.log(er)) })
  }, [loggedIn]);

  useEffect(() => {
    movies.length < MAX_NUMBER_OF_MOVIES ? setShowMoreBtn(false) : setShowMoreBtn(true);
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
    if (numberToShow1 + MAX_NUMBER_OF_MOVIES > movies.length || numberToShow2 + MIN_NUMBER_OF_MOVIES > movies.length) {
      setShowMoreBtn(false);
    }
    if (width >= 480) {
      setNumberToShow1(numberToShow1 + MAX_NUMBER_OF_MOVIES);
    }
    else if (width > 320 & width < 480) {
      setNumberToShow2(numberToShow2 + MIN_NUMBER_OF_MOVIES);
    }
  }

  function getInitialMoviesFromStorage() {
    const retrievedObject = localStorage.getItem(STORAGE_NAME);
    if (retrievedObject) {
      const filtredMovies = JSON.parse(retrievedObject);
      setMovies(filtredMovies.movies);
      setSearchString(filtredMovies.searchString);
      setIsShort(filtredMovies.shortFilms);
    }
  }
  function getInitialMoviesFromServer() {
    moviesApi.getMovies()
      .then((movies) => {
        if (movies) {
          setAllMovies(movies);
        }
      })
      .catch(() => { setNotFoundFilmsMessage('«Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз».') });
  }
  function handleSearchFilm({ searchString, isShort }) {
    filterMovies(searchString, isShort);
  }
  function onSearchChange(searchString) {
    setSearchString(searchString);
  }
  function onShortChange(isChecked) {
    filterMovies(searchString, isChecked);
  }

  function filterMovies(searchString, isShort) {
    let filtredMovies = allMovies.filter(movie => movie.nameRU.toLowerCase().includes(searchString));
    if (isShort) {
      filtredMovies = filtredMovies.filter(movie => movie.duration < SHORT_MOVIES_DURATION);
    }
    filterMovies.length > 0 ? setNotFoundFilmsMessage('Ничего не найдено') : setNotFoundFilmsMessage('');
    setMovies(filtredMovies);
    setSearchString(searchString);
    setIsShort(isShort);
    localStorage.setItem(STORAGE_NAME, JSON.stringify({ 'searchString': searchString, 'shortFilms': isShort, 'movies': filtredMovies }));
  }
  function onSearchSavedFilm() {
    let filtredMovies = savedMovies.filter(movie => movie.nameRU.toLowerCase().includes(searchSavedString));
    if (isSavedShort) {
      filtredMovies = filtredMovies.filter(movie => movie.duration < SHORT_MOVIES_DURATION);
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
      image: MOVIE_IMAGE_HOST + movie.image.url,
      trailerLink: movie.trailerLink,
      thumbnail: MOVIE_IMAGE_HOST + movie.image.formats.thumbnail.url,
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    })
      .then(getInitialSavedMovies())
      .catch((err) => { err.then(er => { handleError(er.message, ERR_STATUS_FALSE); }) });
  }
  function onMovieDislike(movie) {
    const movieId = savedMovies.find(({ movieId }) => movieId === movie.id)._id;
    if (movieId) {
      mainApi.deleteMovie(movieId)
        .then(() => { getInitialSavedMovies() })
        .catch((err) => { err.then(er => { handleError(er.message, ERR_STATUS_FALSE); }) });
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
      .catch((err) => { err.then(er => { handleError(er.message, ERR_STATUS_FALSE); }) });
  }
  function handleUpdateUserInfo(name, email) {
    setIsInputDisabled(true);
    mainApi.updateUserInfo(name, email)
      .then(res => {
        setCurrentUser(res);
        handleError('Данные успешно обновлены', ERR_STATUS_SUCCESS);
      })
      .catch((err) => { err.then(er => { handleError(er.message, ERR_STATUS_FALSE); }) });
    setIsInputDisabled(false);
  }

  function handleRegister(email, password, name) {
    mainApi.register(email, password, name)
      .then(() => {
        setLoggedIn(true);
        history.push('/movies');
        setRegisterStatus({ message: 'Вы успешно зарегистрировались!', status: ERR_STATUS_SUCCESS });
      })
      .catch((err) => { err.then(er => { setRegisterStatus({ message: er.message, status: ERR_STATUS_FALSE }); }) });
  }

  function handleLogin(email, password) {
    mainApi.authorize(email, password)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          history.push('/movies');
        }
      })
      .catch((err) => { err.then(er => { handleError(er.message, ERR_STATUS_FALSE) }) });
  }

  function handleSignOut() {
    mainApi.signout()
      .then(() => {
        localStorage.removeItem(STORAGE_NAME);
        setCurrentUser({ name: '', email: '' });
        setMovies([]);
        setSearchString('');
        setIsShort(true);
        setRegisterStatus({ message: '', status: false });
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
      {loading ? (
        <div className="preloader-wrapper">
          <Preloader />
        </div>
      ) :
        <div className="page">
          <Switch>
            <Route exact path="/">
              <Header headerType="main" loggedIn={loggedIn} />
              <Main />
              <Footer />
            </Route>
            <AuthProtectedRoute
              path="/signup"
              loggedIn={loggedIn}
              component={Register}
              handleRegister={handleRegister}
              registerStatus={registerStatus}
            />
            <AuthProtectedRoute
              path="/signin"
              loggedIn={loggedIn}
              component={Login}
              handleLogin={handleLogin}
            />
            <ProtectedRoute
              path="/movies"
              loggedIn={loggedIn}
              component={Movies}
              header={Header}
              footer={Footer}
              notFoundFilmsMessage={notFoundFilmsMessage}
              onMovieLike={onMovieLike}
              onMovieDislike={onMovieDislike}
              handleSearchFilm={handleSearchFilm}
              isShort={isShort}
              searchString={searchString}
              onSearchChange={onSearchChange}
              onShortChange={onShortChange}
              showedFilms={showedFilms}
              handleMoreMoviesClick={handleMoreMoviesClick}
              showMoreBtn={showMoreBtn}
              savedMovies={savedMovies}
            />
            <ProtectedRoute
              path="/saved-movies"
              loggedIn={loggedIn}
              component={SavedMovies}
              header={Header}
              footer={Footer}
              savedMovies={savedMovies}
              foundedMovies={foundedMovies}
              onDeleteClick={onDeleteClick}
              onSearchSavedFilm={onSearchSavedFilm}
              isShortSavedInitial={isSavedShort}
              searchStringSavedInitial={searchSavedString}
              onSearchSavedChange={onSearchSavedChange}
              onShortSavedChange={onShortSavedChange}
            />
            <ProtectedRoute
              path="/profile"
              loggedIn={loggedIn}
              component={Profile}
              header={Header}
              name={currentUser.name}
              email={currentUser.email}
              handleSignOut={handleSignOut}
              handleUpdateUserInfo={handleUpdateUserInfo}
              isInputDisabled={isInputDisabled}
            />
            <Route path="*">
              <PageNotFound />
            </Route>
          </Switch>
          <Popup />
          <InfoPopup isOpen={isInfoPopupOpen} onClose={closeAllPopups} registerStatus={errorMessage} />
        </div>}
    </CurrentUserContext.Provider>

  );
}

export default App;
