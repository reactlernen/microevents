import { combineReducers } from "redux";
import { systemReducer } from "./system/reducers";

export const rootReducer = combineReducers({
    system: systemReducer
});

export type AppState = ReturnType<typeof rootReducer>;
