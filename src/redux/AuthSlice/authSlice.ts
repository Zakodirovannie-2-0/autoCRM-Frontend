import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface AuthState {
    isAuth: boolean,
}

// Define the initial state using that type
const initialState: AuthState = {
    isAuth: localStorage.getItem('access-token')!==null,
}

export const authSlice = createSlice({
    name: 'auth',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload;
        },
    },
})

export const { setAuth } = authSlice.actions
export default authSlice.reducer