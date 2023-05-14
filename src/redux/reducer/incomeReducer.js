import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {API, history} from "../const";
import {toast} from "react-toastify";
import FileDownload from 'js-file-download'


const initialState = {
    payload: {},
    loading: false,
    isOpen: false,
    income: [],
    url: '',
    urlModal: false,
    download: false
};


export const addIncome = createAsyncThunk(
    'addIncome',
    async ({data}) => {
        const token = localStorage.getItem('access');
        console.log(data);
        console.log(JSON.parse(token));
        const res = await fetch(API + "api/income/", {
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

export const downloadUrl = createAsyncThunk(
    'downloadUrl',
    async ({data}) => {
        const token = localStorage.getItem('access');
        console.log(data);
        console.log(JSON.parse(token));
        const res = await fetch(API + "api/income_document/", {
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


export const getIncome = createAsyncThunk(
    'getIncome',
    async () => {
        const token = localStorage.getItem('access');
        const res = await fetch(API + "api/income/", {
            method: 'GET',
            headers: {
                'Authorization': JSON.parse(token),
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        return await res.json();
    }
);


export const incomeSlice = createSlice({
    name: 'income',
    initialState,
    extraReducers: {
        [addIncome.pending]: (state, payload) => {
            state.loading = true;
        },
        [addIncome.fulfilled]: (state, {payload}) => {
            console.log(payload);
            if (payload.id) {
                toast.success("Income add");
                state.loading = false;
                state.isOpen = false;
                state.payload = payload;
                getIncome();
            } else {
                toast.error("Authorization");
                // history.navigate('/')
            }
        },
        [addIncome.rejected]: (state, payload) => {
            state.loading = true;
        },
        [getIncome.fulfilled]: (state, payload) => {
            console.log(payload.payload);
            state.income = payload.payload
        },
        [downloadUrl.pending]: (state, payload) => {
            console.log('pending');
            console.log(payload)
        },
        [downloadUrl.fulfilled]: (state, payload) => {
            console.log('payload');
            console.log(payload.payload);
            if (payload?.payload?.status == 'ok'){
                state.url = payload.payload.file;
                state.urlModal = false;
                state.download = true
            }
        },
        [downloadUrl.rejected]: (state, payload) => {
            console.log('rejected');
            console.log(payload)
        }
    },
    reducers: {
        openIncomeModal: (state, action) => {
            state.isOpen = true
        },
        closeIncomeModal: (state, action) => {
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


export const {openIncomeModal, closeIncomeModal, closeUrlModal, openUrlModal, openDownloadModal, closeDownloadModal} = incomeSlice.actions;
export default incomeSlice.reducer;