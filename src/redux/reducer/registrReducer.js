import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {API, history} from "../const";
import {toast} from "react-toastify";

const initialState = {
    payload: {},
    loading: false,
};

export const postRegistgr = createAsyncThunk(
    'postRegistr',
    async ({values}) => {
        const res = await fetch(API + "auth/register/", {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        return await res.json();
    }
);

export const registrSlice = createSlice({
    name: 'regitr',
    initialState,
    extraReducers: {
        [postRegistgr.pending]: (state, payload) => {
            state.loading = true;
        },
        [postRegistgr.fulfilled]: (state, {payload}) => {
            console.log(payload);
            if (!payload.user) {
                state.loading = false;
                toast.error("Email is already used")
            } else {
                state.loading = false;
                history.navigate("/home");
                toast.success("Success !!!");
                localStorage.setItem("user", JSON.stringify(payload?.user));
                localStorage.setItem("access", JSON.stringify("Bearer " + payload?.access));
                localStorage.setItem("refresh", JSON.stringify(payload?.refresh));
                state.payload = JSON.parse(localStorage.getItem(payload))
            }
        },
        [postRegistgr.rejected]: (state, payload) => {
            state.loading = true;
        },
    }
});

export default registrSlice.reducer;