import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {API, history} from "../const";
import {toast} from "react-toastify";

const initialState = {
    payload: {},
    loading: false,
};

export const postLogin = createAsyncThunk(
    'postLogin',
    async ({values}) => {
        const res = await fetch(API + "auth/login/", {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        return await res.json();
    }
);

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    extraReducers: {
        [postLogin.pending]: (state, payload) => {
            state.loading = true;
        },
        [postLogin.fulfilled]: (state, {payload}) => {
            console.log(payload);
            if (!payload.user) {
                toast.error("Wrong password or email")
            } else {
                state.loading = false;
                history.navigate("/home");
                toast.success("Success !!!");
                localStorage.setItem("user", JSON.stringify(payload?.user));
                localStorage.setItem("access", JSON.stringify(payload?.access));
                localStorage.setItem("refresh", JSON.stringify(payload?.refresh));
                state.payload = JSON.parse(localStorage.getItem(payload))
            }
        },
        [postLogin.rejected]: (state, payload) => {
            state.loading = true;
        },
    }
});

export default loginSlice.reducer;