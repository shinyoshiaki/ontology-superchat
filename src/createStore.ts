import {
  createStore as reduxCreateStore,
  applyMiddleware,
  combineReducers
} from "redux";

import logger from "redux-logger";
import thunk from "redux-thunk";
import createHistory from "history/createBrowserHistory";
import { routerReducer, routerMiddleware } from "react-router-redux";
import test, { Teststate } from "./modules/test";
import wallet, { Walletstate } from "./modules/wallet";
import chat,{Chatstate}from './modules/chat'

const history = createHistory();
const middleware = routerMiddleware(history);

export default function createStore() {
  const store = reduxCreateStore(
    combineReducers({ test, wallet, router: routerReducer,chat }),
    applyMiddleware(thunk, logger, middleware)
  );
  return { store, history };
}

export interface ReduxState {
  test: Teststate;
  wallet: Walletstate;
  chat:Chatstate
}
