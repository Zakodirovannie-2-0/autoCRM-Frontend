import axios from "axios";
import {instance} from "./api.config.js";

export const signup = (last_name, first_name, email, password, re_password) => {
    return axios.post("https://engine.vstrechya.space/auth/signup/", {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
        re_password: re_password
    });
}

export const login = (email, password) => {
    return instance.post("/auth/signin/", {email, password})
}

export const refreshToken = () => {
    return instance.post("/auth/api/token/refresh/", {
        refresh: localStorage.getItem("refresh-token")
    });
}

export const logout = () => {
    localStorage.removeItem('access-token')
}