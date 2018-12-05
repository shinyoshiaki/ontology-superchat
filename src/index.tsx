import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import createStore from "./createStore";
import Main from "./containers/pages/main";
import { Router, Route } from "react-router";
import Stream from "./containers/pages/stream";

const data = createStore();

ReactDOM.render(
  <Provider store={data.store}>
    <Router history={data.history}>
      <div>
        <Route exact path="/" component={Main} />
        <Route path="/stream" component={Stream} />
      </div>
    </Router>
  </Provider>,
  document.getElementById("root") as HTMLElement
);
