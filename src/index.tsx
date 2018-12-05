import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import createStore from "./createStore";
import Main from "./containers/pages/main";
import { Router, Route } from "react-router";

const data = createStore();

ReactDOM.render(
  <Provider store={data.store}>
    <Router history={data.history}>
      <div>
        <Route exact path="/" component={Main} />        
      </div>
    </Router>
  </Provider>,
  document.getElementById("root") as HTMLElement
);
