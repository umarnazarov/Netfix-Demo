import Main from "./components/Main";
import Login from "./components/Login";
import { Redirect, Route, Switch } from 'react-router-dom'


function App() {
  return (
    <Switch>
      <Redirect exact from="/" to="/home" />
      <Route path='/home' exact component={Main} />
      <Route path='/login' exact component={Login} />
    </Switch>
  );
}

export default App;
