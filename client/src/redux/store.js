import { createStore } from "redux";
import UserReducer from "./reducers/UserReducer";

const store = createStore(UserReducer);

export default store;
