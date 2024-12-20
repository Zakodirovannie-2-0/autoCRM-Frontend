import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface ClientState {
    name: string;
    phone: string;
    email: string;
    creation_date: string;
    id: number[];
}

// Define the initial state using that type
const initialState: ClientState = {
    name: '',
    phone: '',
    email: '',
    creation_date: '',
    id: [],
}

export const clientSlice = createSlice({
    name: 'client',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setClientName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        setClientPhone: (state, action: PayloadAction<string>) => {
            state.phone = action.payload;
        },
        setClientEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setClientCreation: (state, action: PayloadAction<string>) => {
            state.creation_date = action.payload;
        },
        setClientIds: (state, action: PayloadAction<number[]>) => {
            state.id = action.payload
        }
    },
})

export const { setClientName, setClientEmail,
    setClientPhone, setClientCreation,
    setClientIds} = clientSlice.actions
export default clientSlice.reducer