import React, { Component } from 'react';
import './App.css';
//Navigation
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter, Router, Route, Switch } from "react-router-dom";
import PrivateLayout from "./components/layouts/PrivateLayout";
import PublicLayout from "./components/layouts/PublicLayout";
import { createBrowserHistory } from 'history';
import {loadUser} from "./redux/actions/authActions";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const history = createBrowserHistory();

toast.configure();

class App extends Component {

    render() {
    return (
        <Router history={history}>
            <Provider store={store}>
                <div className="App">
                    <BrowserRouter>
                        <Switch>
                            <Route path="/app" component={PublicLayout}/>
                            <Route path="/" component={PrivateLayout}/>
                        </Switch>
                    </BrowserRouter>
                </div>
            </Provider>
        </Router>
    );
  }
}

export default App;
