import { combineReducers } from "redux";
import usersReducer from "./usersReducer";
import ejerciciosReducer from "./ejerciciosReducers";
import resultsReducers from "./resultsReducers";

export default combineReducers({
    users: usersReducer,
    ejercicios: ejerciciosReducer,
    results: resultsReducers
});