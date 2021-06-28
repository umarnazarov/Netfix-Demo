import Main from "./components/Main";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { Redirect, Route, Switch } from 'react-router-dom'
import AuthProvider from './context/AuthContext'
import PrivateLoginPage from './components/PrivateLoginPage'
import PrivateSignUpPage from './components/PrivateSignUpPage'

function App() {
  return (
    <AuthProvider>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route path='/home' exact component={Main} />
        <PrivateLoginPage path='/login' exact component={Login} />
        <PrivateSignUpPage path='/signup' exact component={SignUp} />
      </Switch>
    </AuthProvider>

  );
}

export default App;
