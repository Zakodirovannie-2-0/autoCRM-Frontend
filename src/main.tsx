import { createRoot } from 'react-dom/client'
import './index.css'
import store from './redux/store.ts'
import { Provider } from 'react-redux'
import LoginPage from "./pages/LoginPage.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage />,
    },
]);

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>,
)
