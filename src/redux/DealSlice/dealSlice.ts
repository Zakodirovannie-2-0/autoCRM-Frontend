import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface DealState {
    name: string;
    time: string;
    client: string;
    phone: string;
    email: string;
}

// Define the initial state using that type
const initialState: DealState = {
    name: '',
    time: '',
    client: '',
    phone: '',
    email: '',
}

export const dealSlice = createSlice({
    name: 'client',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setDealName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        setDealTime: (state, action: PayloadAction<string>) => {
            state.time = action.payload;
        },
        setDealClient: (state, action: PayloadAction<string>) => {
            state.client = action.payload;
        },
        setDealPhone: (state, action: PayloadAction<string>) => {
            state.phone = action.payload;
        },
        setDealEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
    },
})

export const { setDealName, setDealTime, setDealClient, setDealEmail, setDealPhone } = dealSlice.actions
export default dealSlice.reducer