import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {API} from "../const";

const initialState = {
    income: [],
    expense: []
};

export const getIncomeChart = createAsyncThunk(
    'getIncomeChart',
    async () => {
        const token = localStorage.getItem('access');
        const companyId = localStorage.getItem('companyId');
        const res = await fetch(API + "api/income/?company_id="+companyId, {
            method: 'GET',
            headers: {
                'Authorization': JSON.parse(token),
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        return await res.json();
    }
);

export const getExpenseChart = createAsyncThunk(
    'getExpenseChart',
    async () => {
        const token = localStorage.getItem('access');
        const companyId = localStorage.getItem('companyId');
        const res = await fetch(API + "api/expense/?company_id="+companyId, {
            method: 'GET',
            headers: {
                'Authorization': JSON.parse(token),
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        return await res.json();
    }
);

export const chartSlice = createSlice({
    name: 'chart',
    initialState,
    extraReducers: {
        [getIncomeChart.fulfilled]: (state, payload) => {
            console.log(payload.payload);
            state.income = payload.payload
        },
        [getExpenseChart.fulfilled]: (state, payload) => {
            console.log(payload.payload);
            console.log('payload.payload');
            state.expense = payload.payload
        },
        [getExpenseChart.rejected]: (state, payload) => {
            console.log(payload);
            console.log('rejected');
            // state.expense = payload.payload
        },
        [getExpenseChart.pending]: (state, payload) => {
            console.log(payload);
            console.log('pending');
            // state.expense = payload.payload
        },

    }
});

export default chartSlice.reducer;