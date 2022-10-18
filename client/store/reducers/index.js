import { combineReducers } from "redux";
import AppReducer from "./appReducer";
import AuthReducer from "./AuthReducer";

export default combineReducers({
    auth: AuthReducer,
    app:AppReducer
})