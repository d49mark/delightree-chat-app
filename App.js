import React, { Component } from "react";

import { createStore, applyMiddleware } from "redux";
import { Provider, connect } from "react-redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";

import ChatUI from "./src/components/ChatUi";
import LoginUI from "./src/components/LoginUI";
import rootReducer from "./src/reducers";

const loggerMiddleware = createLogger();

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware
    //loggerMiddleware
  )
);

import { Examples } from "@shoutem/ui";

const LoginOrChat = connect((state) => ({
  authorized: state.user.authorized,
}))(({ authorized, dispatch }) => {
  if (authorized) {
    return <ChatUI />;
  } else {
    return <LoginUI />;
  }
});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <LoginOrChat />
      </Provider>
    );
  }
}

export default App;
