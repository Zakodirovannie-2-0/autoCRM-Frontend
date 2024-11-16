import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface ClientData {
    id: number;
    name: string;
    phone: string;
    email: string;
    creation_date: string;
}

interface ClientState {
    clientData: ClientData;
}

// Define the initial state using that type
const initialState: ClientState = {
    clientData: {
        id: 0,
        name: '',
        phone: '',
        email: '',
        creation_date: ''
    },
}

export const clientSlice = createSlice({
    name: 'client',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setClient: (state, action: PayloadAction<ClientData>) => {
            state.clientData = action.payload;
        },
    },
})

export const { setClient } = clientSlice.actions
export default clientSlice.reducer