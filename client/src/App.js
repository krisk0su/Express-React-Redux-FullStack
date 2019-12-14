import React, { Component } from "react";
import AppNavbar from "./components/AppNavbar";
import ShoppingList from "./components/ShoppingList";
import PostList from "./components/Posts/PostList";
import PostDetails from "./components/Posts/PostDetails";
import Youtube from "./components/Youtube/Youtube.js";
import { Container } from "reactstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authAction";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <AppNavbar />
            <Container>
              <Switch>
                <Route path="/api/posts" exact component={PostList} />
                <Route path="/api/posts/:id" component={PostDetails} />
                <Route path="/api/items" exact component={ShoppingList} />
                <Route path="/api/youtube" exact component={Youtube} />
              </Switch>
            </Container>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
