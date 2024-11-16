import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface AuthState {
    isOpen: boolean,
}

// Define the initial state using that type
const initialState: AuthState = {
    isOpen: false,
}

export const modalSlice = createSlice({
    name: 'modal',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setOpen: (state, action: PayloadAction<boolean>) => {
            state.isOpen = action.payload;
        },
    },
})

export const { setOpen } = modalSlice.actions
export default modalSlice.reducer