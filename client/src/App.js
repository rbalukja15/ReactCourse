import React, { Component } from 'react';
import './App.css';
//Navigation
import AppNavbar from './components/navigation/AppNavbar';
import { Provider } from "react-redux";
import store from "./store";
import Item from "./components/items/Item";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Invoice from "./components/invoice/Invoice";

class App extends Component {

  render() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div className="App">
                    <AppNavbar>
                        <Switch>
                            <Route exact path={"/"} component={Item}/>
                            <Route exact path={"/invoice"} component={Invoice}/>
                        </Switch>
                    </AppNavbar>
                </div>
            </BrowserRouter>
        </Provider>
    );
  }
}

export default App;
