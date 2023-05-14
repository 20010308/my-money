import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./reducer/loginReducer";
import registrReducer from "./reducer/registrReducer";
import companyReducer from "./reducer/companyReducer";
import incomeReducer from './reducer/incomeReducer'
import expenseReducer from "./reducer/expenseReducer";
import chartReducer from "./reducer/chartReducer";

export const store = configureStore({
    reducer: {
        loginReducer,
        registrReducer,
        companyReducer,
        incomeReducer,
        expenseReducer,
        chartReducer
    }
});