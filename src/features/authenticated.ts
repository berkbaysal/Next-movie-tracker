import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store";

const initialState:{value:boolean} = {value:false};

export const authenticatedSlice = createSlice({
    name: "authenticated",
    initialState,
    reducers: {
        changeAuthenticated: (state, action:PayloadAction<boolean>) => {
           state.value = action.payload;
        },
    }
})

export const selectAuthenticated = (state:RootState) => state.authenticated.value
export const { changeAuthenticated} = authenticatedSlice.actions;
export default authenticatedSlice.reducer;