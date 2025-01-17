import axios from "axios";
import {instance} from "./api.config.ts";
import {FormDataWidget} from "../pages/WidgetPage.tsx";

export const getServices = () => {
    return axios.get('http://85.192.29.94:8000/crm/service/')
}

export const postWidget = (formData : FormDataWidget) => {
    const [last_name, first_name] = formData.full_name.split(' ');
    const dateTime = `${formData.date} ${formData.time}`;
    return axios.post(`http://85.192.29.94:8000/crm/widget/`, {
        first_name,
        last_name,
        email: formData.email,
        phone: formData.phone,
        service_id: formData.service_id,
        date: dateTime
    })
}

export const signup = (full_name:string, email:string, password:string) => {
    const [surname, name] = full_name.split(' ')
    return axios.post("http://85.192.29.94:8000/accounts/user/", {
        first_name: name,
        last_name: surname,
        email: email,
        password: password
    });
}

export const login = async (email:string, password:string) => {
    return await axios.post("http://85.192.29.94:8000/api/token/", {
        email,
        password
    })
}

export const refreshToken = () => {
    return instance.post("/auth/api/token/refresh/", {
        refresh: localStorage.getItem("refresh-token")
    });
}

export const logout = () => {
    localStorage.removeItem('access-token')
    window.location.assign('/')
}

export const getMyInfo = () => {
    return instance.get("/accounts/me/")
}

export const updatePhoto = (photo:any) => {
    return instance.patch("/accounts/me/", photo)
}


export const getClients = () => {
    // return instance.get('/crm/business/1/customers/')
    return instance.get('/accounts/customer/')
}

export const getClientDetails = (id: any) => {
    return instance.get(`/accounts/customer/${id}/`)
}

export const createClient = (full_name:string, email:string, phone_number:string) => {
    const [last_name, first_name] = full_name.split(' ');
    return instance.post(`/accounts/customer/`, {
        first_name,
        last_name,
        email,
        phone_number,
    })
}

export const patchClient = (full_name:string, email:string, phone_number:string, id: any) => {
    const [last_name, first_name] = full_name.split(' ');
    return instance.patch(`/accounts/customer/${id}/`, {
        first_name,
        last_name,
        email,
        phone_number,
    })
}

export const deleteClients = (ids: number[]) => {
    ids.map((id) => {
        instance.delete(`/accounts/customer/${id}/`)
    });
    window.location.reload()
}

export const getWidgets = (id : any = 1,) => {
    return instance.get(`/crm/project/${id}/orders/`)
}