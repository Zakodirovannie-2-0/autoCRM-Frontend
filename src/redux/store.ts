import { configureStore } from '@reduxjs/toolkit'
import authReducer from './AuthSlice/authSlice.ts'
import modalReducer from './ModalSlice/modalSlice.ts'
import clientReducer from './ClientSlice/clientSlice.ts'
import dealReducer from './DealSlice/dealSlice.ts'
// ...

const store = configureStore({
    reducer: {
        auth: authReducer,
        modal: modalReducer,
        client: clientReducer,
        deal: dealReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export default store;