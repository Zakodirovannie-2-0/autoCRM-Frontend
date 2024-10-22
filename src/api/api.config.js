import axios from "axios";

export const instance = axios.create({
    withCredentials: true,
    baseURL: "https://engine.vstrechya.space/",
});


instance.interceptors.request.use(
    (config) => {
        config.headers.Authorization = `Bearer ${localStorage.getItem("access-token")}`
        return config
    }
)

// Интерсептор для ответов
instance.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response && error.response.status === 401) {
        // Обработка ошибки неавторизованного доступа
        console.error('Unauthorized access - possibly redirect to login');
        // Можно, например, редиректить на страницу логина
    }
    return Promise.reject(error);
});