import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface TaskState {
    title: string,
    executor: string,
    description: string,
}

// Define the initial state using that type
const initialState: TaskState = {
    title: '',
    executor: '',
    description: '',
}

export const taskSlice = createSlice({
    name: 'task',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setTaskName: (state, action: PayloadAction<string>) => {
            state.title = action.payload;
        },
        setTaskExecutor: (state, action: PayloadAction<string>) => {
            state.executor = action.payload;
        },
        setTaskDescription: (state, action: PayloadAction<string>) => {
            state.description = action.payload;
        },
    },
})

export const { setTaskName, setTaskExecutor, setTaskDescription } = taskSlice.actions
export default taskSlice.reducer