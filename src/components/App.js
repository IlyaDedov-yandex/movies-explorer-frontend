import { Switch, Route } from 'react-router-dom';

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

const { films } = require('../utils/constants/films');
const { savedFilms } = require('../utils/constants/films')
function App() {
  return (
    <div className="page">
      <Switch>
        <Route exact path="/">
          <Header headerType="main" />
          <Main />
          <Footer />
        </Route>
        <Route path="/signup">
          <Register />
        </Route>
        <Route path="/signin">
          <Login />
        </Route>
        <Route path="/movies">
          <Header />
          <Movies films={films} />
          <Footer />
        </Route>
        <Route path="/saved-movies">
          <Header />
          <SavedMovies films={savedFilms} />
          <Footer />
        </Route>
        <Route path="/profile">
          <Header />
          <Profile name={'Виталий'} email={'pochta@yandex.ru'} />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
      <Popup />


      {/* <Register /> */}
      {/* <Login /> */}
      {/* <Header />
      <Movies />
      <Footer /> */}
      {/* <Header />
      <Main />
      <Footer /> */}
    </div>
  );
}

export default App;
