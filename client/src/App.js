import React, { Component } from 'react';
import './App.css';
//Navigation
import AppNavbar from './components/navigation/AppNavbar';
import { Provider } from "react-redux";
import store from "./store";
import Item from "./components/items/Item";

class App extends Component {

  render() {
    return (
        <Provider store={store}>
            <div className="App">
                <AppNavbar>
                    <Item />
                </AppNavbar>
            </div>
        </Provider>
    );
  }
}

export default App;
