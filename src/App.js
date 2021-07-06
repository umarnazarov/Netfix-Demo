import Main from "./components/Main";
import Profile from "./components/Profile";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { Redirect, Route, Switch } from 'react-router-dom'
import AuthProvider from './context/AuthContext'
import PrivateLoginPage from './components/PrivateLoginPage'
import PrivateSignUpPage from './components/PrivateSignUpPage'
import PrivateUserPage from './components/PrivateUserPage'
import PrivateFilmRoute from './components/PrivateFilmRoute'
import Films from "./components/Films";
import PrivateMoviePage from "./components/PrivateMoviePage"
import MoviesProvider from "./context/MoviesContext"

function App() {
  return (
    <AuthProvider>
      <MoviesProvider>
        <Switch>
          <Redirect exact from="/" to="/home" />
          <Route path='/home' exact component={Main} />
          <PrivateLoginPage path='/login' exact component={Login} />
          <PrivateSignUpPage path='/signup' exact component={SignUp} />
          <PrivateFilmRoute path='/home/films' exact component={Films} />
          <PrivateUserPage path='/home/profile' exact component={Profile} />
          <PrivateMoviePage />
        </Switch>
      </MoviesProvider>
    </AuthProvider>

  );
}

export default App;
