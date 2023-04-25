import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./reducer/loginReducer";
import registrReducer from "./reducer/registrReducer";

export const store = configureStore({
    reducer: {
        loginReducer,
        registrReducer
    }
});