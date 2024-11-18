import '../index.css'
import React, {useState} from "react";
import {AxiosError, AxiosResponse} from "axios";
import {setAuth} from "../redux/AuthSlice/authSlice.ts";
import {useAppDispatch} from "../hooks/reduxHooks.ts";
import {login} from '../api/api.auth.ts'

interface LoginResponse {
    access: string;
    refresh: string;
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
            await login(email, password).then((response: AxiosResponse<LoginResponse>) => {
                console.log(response);
                setIsLogin(true)
                setIsError(false)
                localStorage.setItem('access-token', response.data.access)
                localStorage.setItem('refresh-token', response.data.refresh)
                dispatch(setAuth(response.data.access !== null))
                window.location.assign('/clients')
            }).catch(e => {
                setIsError(true);
                setErrorMessage(
                    e.response.data.detail === 'Не найдено активной учетной записи с указанными данными'
                        ? 'Неправильный E-mail или пароль'
                        : "Произошла непредвиденная ошибка"
                );
            })
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
        <div className={'w-full flex flex-col h-dvh mx-auto bg-main-bg bg-cover overflow-auto'}>
            <header className="mt-52 xl:mt-28">
                <div className="flex flex-col w-full text-[#000000]">
                    <div> <h2 className="text-5xl text-center font-semibold drop-shadow-lg">Вход</h2></div>
                </div>
            </header>
            <div className={'mt-32 container mx-auto max-w-xm flex flex-col'}>
                <div className={'flex flex-col w-full'}>
                    {isLogin && <span className={'success'}>Вы успешно вошли в аккаунт</span>}
                    {isError && <span className={'error'}>{errorMessage}</span>}
                    <form onSubmit={(event) => event.preventDefault()}>
                        <div className="form-group flex flex-col">
                            <label htmlFor="email" className={'text-lg font-semibold'}>E-mail</label>
                            <input
                                type="email"
                                id="email"
                                required
                                onChange={e => setEmail(e.target.value)}
                                value={email}
                                className={'input mt-2.5 bg-[#FFFFFFCC] rounded-md p-2 drop-shadow-lg'}
                            />
                        </div>
                        <div className="form-group flex flex-col mt-12">
                            <label htmlFor="password" className={'text-lg font-semibold'}>Пароль</label>
                            <input
                                type="password"
                                id="password"
                                required
                                onChange={e => setPassword(e.target.value)}
                                value={password}
                                className={'input mt-2.5 bg-[#FFFFFFCC] rounded-md p-2 drop-shadow-lg'}
                            />
                        </div>
                    <div className={"form-actions flex flex-row justify-center mt-20 gap-10"}>
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className={'text-center text-lg font-semibold button py-2 px-11 bg-[#4C2A21] rounded-md text-[#FFFFFF] btn'}
                        >
                            Войти
                        </button>

                        <a href="/recovery" className={'text-center text-lg font-semibold py-2 px-16 bg-[#4C2A21] rounded-md text-[#FFFFFF] btn'}>
                            Забыли пароль?
                        </a>
                    </div>
                        <a href="/signup" className={'text-center text-xl text-black opacity-30 hover:opacity-100 flex justify-center mt-5'}>Регистрация</a>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default LoginPage;