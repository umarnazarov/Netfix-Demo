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
import PrivateSavedMovie from "./components/PrivateSavedMovie"
import PrivateMoviePage from "./components/PrivateMoviePage"
import SavedMovies from "./components/SavedMovies";
import ForgotPassword from "./components/ForgotPassword";

function App() {
  return (
    <AuthProvider>
        <Switch>
          <Redirect exact from="/" to="/home" />
          <Route path='/home' exact component={Main} />
          <Route path='/forgotpassword' exact component={ForgotPassword} />
          <PrivateLoginPage path='/login' exact component={Login} />
          <PrivateSignUpPage path='/signup' exact component={SignUp} />
          <PrivateFilmRoute path='/home/films' exact component={Films} />
          <PrivateUserPage path='/home/profile' exact component={Profile} />
          <PrivateSavedMovie path='/home/films/saved' exact component={SavedMovies} />
          <PrivateMoviePage />
        </Switch>
    </AuthProvider>

  );
}

export default App;
