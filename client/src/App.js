import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import jwtDecode from "jwt-decode";

import store from "./store";
import * as Type from "./store/actions/types";
import setAuthToken from "./utils/setAuthToken";

import Home from "./components/pages/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/pages/Dashboard";

function App() {
  const token = localStorage.getItem("jwt_token");
  if (token) {
    setAuthToken(token);
    let decoded = jwtDecode(token);
    store.dispatch({
      type: Type.SET_USER,
      payload: decoded
    });
  }
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className='container'>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/dashboard' component={Dashboard} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
