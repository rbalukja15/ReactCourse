import React, { Component } from 'react';
import './App.css';
//Navigation
import { Provider } from "react-redux";
import store from "./store";
import Item from "./components/items/Item";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PrivateLayout from "./components/layouts/PrivateLayout";
import PublicLayout from "./components/layouts/PublicLayout";
import Login from "./components/login/Login";

class App extends Component {

  render() {
    return (
        <Provider store={store}>
            <div className="App">
                <BrowserRouter>
                    <Switch>
                        <Route path="/" component={PrivateLayout}/>
                        <Route path="/app" component={Login}/>
                    </Switch>
                </BrowserRouter>
            </div>
        </Provider>
    );
  }
}

export default App;
