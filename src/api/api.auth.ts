import axios from "axios";
import {instance} from "./api.config.ts";

export const signup = (full_name:string, email:string, password:string, re_password:string) => {
    return axios.post("http://localhost:8080", {
        full_name: full_name,
        email: email,
        password: password,
        re_password: re_password
    });
}

export const login = (email:string, password:string) => {
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