import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authenticatedReducer from "./features/authenticated"

export const store = configureStore({
    reducer:{
        authenticated: authenticatedReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch 
export default store