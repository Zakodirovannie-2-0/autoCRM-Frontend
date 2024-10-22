import '../index.css'
import React, {useState} from "react";
import {AxiosError, AxiosResponse} from "axios";
import {setAuth} from "../redux/AuthSlice/authSlice.ts";
import {useAppDispatch} from "../hooks/reduxHooks.ts";
import {login} from '../api/api.auth.ts'

interface LoginResponse {
    accessToken: string;
    refreshToken: string;
}

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const dispatch = useAppDispatch();

    const handleSubmit = async(event:React.FormEvent) => {
        event.preventDefault();
        try {
            const response: AxiosResponse<LoginResponse> = await login(email, password);
            setIsLogin(true)
            setIsError(false)
            localStorage.setItem('access-token', response.data.accessToken)
            localStorage.setItem('refresh-token', response.data.refreshToken)
            dispatch(setAuth(response.data.accessToken !== null))
            window.location.assign('https://vstrecya.space/')
        } catch (e) {
            if (e instanceof AxiosError && e.response) {
                if (e.response.status === 401 || e.response.status === 400) {
                    setIsError(true);
                    setErrorMessage(
                        e.response.data.detail === 'Не найдено активной учетной записи с указанными данными'
                            ? 'Неправильный E-mail или пароль'
                            : "Произошла непредвиденная ошибка"
                    );
                } else {
                    console.log('Error: ' + e);
                }
            } else {
                console.log('Неизвестная ошибка: ', e);
            }
            setIsLogin(false);
        } finally {
            setIsLogin(false);
        }

    }
    
    return (
        <div className={'div'}>
            <div className={'div'}>
                <h2>Вход</h2>
                {isLogin && <span className={'success'}>Вы успешно вошли в аккаунт</span>}
                {isError && <span className={'error'}>{errorMessage}</span>}
                <form onSubmit={(event)=>event.preventDefault()}>
                    <div className="form-group">
                        <label htmlFor="email">E-mail</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Введите ваш email"
                            required
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                            className={'input'}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Пароль</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Введите ваш пароль"
                            required
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                            className={'input'}
                        />
                    </div>
                    <div className={"form-actions"}>
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className={'button'}
                        >
                            Войти
                        </button>

                        <a href="#">
                            Забыли пароль?
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;