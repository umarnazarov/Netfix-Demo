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


function App() {
  return (
    <AuthProvider>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route path='/home' exact component={Main} />
        <PrivateLoginPage path='/login' exact component={Login} />
        <PrivateSignUpPage path='/signup' exact component={SignUp} />
        <PrivateUserPage path='/home/profile' exact component={Profile} />
        <PrivateFilmRoute path='/home/films' exact component={Films} />
      </Switch>
    </AuthProvider>

  );
}

export default App;
