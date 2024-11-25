import { createSlice } from "@reduxjs/toolkit";


export const cartSlice = createSlice({

    name: 'cart',
    initialState: {
        access_token: null,
        user: null,
    },

    reducers: {
        setToken: (state, action) => {
            state.access_token = action.payload
        },
        clearToken: (state) => {
            state.access_token = null;
        },
        setUser: (state, action) => {
            state.user = action.payload
        },
    }
})


export const { setToken, clearToken, setUser } = cartSlice.actions

export default cartSlice.reducer