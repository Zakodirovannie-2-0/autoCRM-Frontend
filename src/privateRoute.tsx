import {Navigate, Outlet} from "react-router-dom";
import {useAppSelector} from "./hooks/reduxHooks.ts";

const PrivateRoute = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth)

  if (isAuth) {
    return <Outlet/>
  } else {
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;