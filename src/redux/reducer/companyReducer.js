import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {API, history} from "../const";
import {toast} from "react-toastify";

const initialState = {
    payload: {},
    loading: false,
    isOpen: false,
    company: []
};


export const addCompany = createAsyncThunk(
    'addCompany',
    async ({data}) => {
        const token = localStorage.getItem('access');
        console.log(data);
        console.log(JSON.parse(token));
        const res = await fetch(API + "api/company/", {
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

export const getCompany = createAsyncThunk(
    'getCompany',
    async () => {
        const token = localStorage.getItem('access');
        const res = await fetch(API + "api/company/", {
            method: 'GET',
            headers: {
                'Authorization': JSON.parse(token),
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        return await res.json();
    }
);

export const companySlice = createSlice({
    name: 'company',
    initialState,
    extraReducers: {
        [addCompany.pending]: (state, payload) => {
            state.loading = true;
        },
        [addCompany.fulfilled]: (state, {payload}) => {
            console.log(payload);
            if (payload.id) {
                toast.success("Company add");
                state.loading = false;
                state.isOpen = false;
                state.payload = payload;
                console.log(getCompany());
                getCompany();
            } else {
                toast.error("Authorization");
                history.navigate('/')
            }
        },
        [addCompany.rejected]: (state, payload) => {
            state.loading = true;
        },
        [getCompany.fulfilled]: (state, payload) => {
            // console.log(payload.payload);
            state.company = payload.payload
        }
    },
    reducers: {
        openCompanyModal: (state, action) => {
            state.isOpen = true
        },
        closeCompanyModal: (state, action) => {
            state.isOpen = false
        },
    }
});


export const {openCompanyModal, closeCompanyModal} = companySlice.actions;
export default companySlice.reducer;
