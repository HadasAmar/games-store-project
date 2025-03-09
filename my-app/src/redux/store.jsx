import { combineReducers, createStore } from "redux";
import { dataGameReducer } from "./reducer/gameReducer";
import { dataCategoryReducer } from "./reducer/categoryReducer";
import { dataCustomerReducer } from "./reducer/customerReducer";
import { dataCartReducer } from "./reducer/cartReducer";

const reducer = combineReducers({
    dataGameReducer,
    dataCategoryReducer,
    dataCustomerReducer,
    dataCartReducer
});

export const mystore = createStore(reducer);
window.store = mystore;