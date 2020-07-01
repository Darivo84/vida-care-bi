import { combineReducers, createStore } from "redux";

import * as ducks from "./ducks";

const reducers = combineReducers(ducks);

const store = createStore(reducers);

export default store;
