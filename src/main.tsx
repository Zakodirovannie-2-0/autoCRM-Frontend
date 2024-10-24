import { createRoot } from 'react-dom/client'
import './index.css'
import store from './redux/store.ts'
import { Provider } from 'react-redux'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";
import PrivateRoute from "./privateRoute.tsx";
import WidgetPage from "./pages/WidgetPage.tsx";
import Register from "./pages/SignupPage.tsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/form" element={<WidgetPage />} />

            <Route path="/" element={<LoginPage />} />
            <Route path='/signup' element={<Register />} />

            <Route path='' element = {<PrivateRoute />}>
            </Route>
        </Route>
    )
);

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>,
)
