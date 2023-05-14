import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {API} from "../const";
import {toast} from "react-toastify";
import FileDownload from "js-file-download";


const initialState = {
    payload: {},
    loading: false,
    isOpen: false,
    expense: [],
    urlModal: false,
    url: '',
    download: false
};


export const addExpence = createAsyncThunk(
    'addExpense',
    async ({data}) => {
        const token = localStorage.getItem('access');
        console.log(data);
        console.log(JSON.parse(token));
        const res = await fetch(API + "api/expense/", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Authorization': JSON.parse(token),
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        return await res.json();
    }
);

export const getExpense = createAsyncThunk(
    'getExpense',
    async () => {
        const token = localStorage.getItem('access');
        const res = await fetch(API + "api/expense/", {
            method: 'GET',
            headers: {
                'Authorization': JSON.parse(token),
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        return await res.json();
    }
);

export const downloadUrl = createAsyncThunk(
    'downloadUrl',
    async ({data}) => {
        const token = localStorage.getItem('access');
        console.log(data);
        console.log(JSON.parse(token));
        const res = await fetch(API + "api/expense_document/", {
            method: 'POST',
            body: JSON.stringify(data),
            responseType: 'blob',
            headers: {
                'Authorization': JSON.parse(token),
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        return await res.json();
    }
);


export const expenseSlice = createSlice({
    name: 'expense',
    initialState,
    extraReducers: {
        [addExpence.pending]: (state, payload) => {
            state.loading = true;
        },
        [addExpence.fulfilled]: (state, {payload}) => {
            console.log(payload);
            if (payload.id) {
                toast.success("Expense add");
                state.loading = false;
                state.isOpen = false;
                state.payload = payload;
                getExpense();
            } else {
                toast.error("Authorization");
                // history.navigate('/')
            }
        },
        [addExpence.rejected]: (state, payload) => {
            state.loading = true;
        },
        [getExpense.fulfilled]: (state, payload) => {
            console.log(payload.payload);
            state.expense = payload.payload
        },
        [downloadUrl.pending]: (state, payload) => {
            console.log('pending');
            console.log(payload)
        },
        [downloadUrl.fulfilled]: (state, payload) => {
            console.log('payload');
            console.log(payload.payload);
            if (payload?.payload?.status == 'ok') {
                state.url = payload.payload.file;
                state.urlModal = false;
                state.download = true
            }
        },
        [downloadUrl.rejected]: (state, payload) => {
            console.log('rejected');
            console.log(payload);

        }
    },
    reducers: {
        openExpenseModal: (state, action) => {
            state.isOpen = true
        },
        closeExpenseModal: (state, action) => {
            state.isOpen = false
        },
        openUrlModal: (state, action) => {
            state.urlModal = true
        },
        closeUrlModal: (state, action) => {
            state.urlModal = false
        },
        openDownloadModal: (state, action) => {
            state.download = true
        },
        closeDownloadModal: (state, action) => {
            state.download = false
        },
    }
});


export const {openDownloadModal, closeDownloadModal, openExpenseModal, closeExpenseModal, openUrlModal, closeUrlModal} = expenseSlice.actions;
export default expenseSlice.reducer;