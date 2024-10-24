import React, { useState, ChangeEvent, FormEvent } from "react";
import { signup } from "../api/api.auth.ts";
import { useNavigate } from "react-router-dom";

interface FormData {
    full_name: string;
    email: string;
    password: string;
    re_password: string;
}

interface ErrorData extends Error {
    response?: {
        status: number;
        data: {
            detail: string
        };
    };
}

const Register: React.FC = () => {
    const [data, setData] = useState<FormData>({
        full_name: '',
        email: '',
        password: '',
        re_password: '',
    });
    const [error, setError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [submitted, setSubmitted] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = evt.target;
        setData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        const commonPasswords = ['password', '12345678', 'qwerty', 'abc123', 'password1'];

        const passwordContainsUserInfo = (password: string, fullName: string, email: string) => {
            const lowerPassword = password.toLowerCase();
            return (
                lowerPassword.includes(fullName.toLowerCase().split(' ')[0]) ||
                lowerPassword.includes(fullName.toLowerCase().split(' ')[1]) ||
                lowerPassword.includes(fullName.toLowerCase().split(' ')[2]) ||
                lowerPassword.includes(email.split('@')[0].toLowerCase())
            );
        };

        const isPasswordValid = (password: string, fullName: string, email: string) => {
            if (password.length <= 8) {
                return { valid: false, error: 'Пароль должен быть длиннее или равен 8 символам' };
            }
            if (commonPasswords.includes(password)) {
                return { valid: false, error: 'Пароль слишком часто используется' };
            }
            if (/^\d+$/.test(password)) {
                return { valid: false, error: 'Пароль не может состоять только из цифр' };
            }
            if (passwordContainsUserInfo(password, fullName, email)) {
                return { valid: false, error: 'Пароль не должен содержать ваши данные' };
            }
            return { valid: true };
        };

        try {
            const { full_name, email, password, re_password } = data;

            if (password !== re_password) {
                setError(true);
                setSubmitted(false);
                setErrorMessage('Пароли не совпадают');
                return;
            }

            const validation = isPasswordValid(password, full_name, email);
            if (!validation.valid) {
                setError(true);
                setSubmitted(false);
                setErrorMessage(validation.error || '');
                return;
            }

            await signup(full_name, email, password, re_password);
            setSubmitted(true);
            setError(false);
            navigate('/');
        } catch (e : unknown) {
            const err = e as ErrorData;
            if (err.response && (err.response.status === 401 || err.response.status === 400)) {
                setError(true);
                setErrorMessage(err.response.data.detail || "Пользователь с таким email уже существует");
            } else {
                console.log('Error: ' + e);
            }
            setSubmitted(false);
        } finally {
            setSubmitted(false);
        }
    };

    return (
        <div className={'w-full flex flex-col h-dvh mx-auto bg-main-bg bg-cover overflow-auto'}>
            <header className="mt-40">
                <div className="flex flex-col w-full text-[#000000]">
                    <div><h2 className="text-5xl text-center font-semibold drop-shadow-lg">Регистрация</h2></div>
                </div>
            </header>
                <div className={'mt-32 container mx-auto max-w-xm flex flex-col'}>
                    <div className={'flex flex-col'}>
                        <div className={'form_container'}>
                            <form className={'form flex flex-col'} onSubmit={handleSubmit}>
                                {error && <span className={'error'}>{errorMessage}</span>}
                                {submitted && <span className={'success'}>Вы успешно зарегистрировались!</span>}
                                <div className={'inputLabel flex flex-col'}>
                                    <label htmlFor='full_name' className={'text-lg font-semibold'}>ФИО</label>
                                    <input
                                        type="text"
                                        name="full_name"
                                        id="full_name"
                                        autoComplete='full name'
                                        className={'input mt-2.5 bg-[#FFFFFFCC] rounded-md p-2 drop-shadow-lg'}
                                        required
                                        onChange={handleChange}
                                        value={data.full_name}
                                    />
                                </div>
                                <div className={'inputLabel flex flex-col mt-12'}>
                                    <label htmlFor='email' className={'text-lg font-semibold'}>E-mail</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        autoComplete='email'
                                        className={'input mt-2.5 bg-[#FFFFFFCC] rounded-md p-2 drop-shadow-lg'}
                                        required
                                        onChange={handleChange}
                                        value={data.email}
                                    />
                                </div>
                                <div className={'inputLabel flex flex-col mt-12'}>
                                    <label htmlFor='password' className={'text-lg font-semibold'}>Пароль</label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        autoComplete='off'
                                        className={'input mt-2.5 bg-[#FFFFFFCC] rounded-md p-2 drop-shadow-lg'}
                                        required
                                        onChange={handleChange}
                                        value={data.password}
                                    />
                                </div>
                                <div className={'inputLabel flex flex-col mt-12'}>
                                    <label htmlFor='re_password' className={'text-lg font-semibold'}>Повторите пароль</label>
                                    <input
                                        type="password"
                                        name="re_password"
                                        id="re_password"
                                        autoComplete='off'
                                        className={'input mt-2.5 bg-[#FFFFFFCC] rounded-md p-2 drop-shadow-lg'}
                                        required
                                        onChange={handleChange}
                                        value={data.re_password}
                                    />

                                </div>
                                <button className={'mt-20 mx-auto register text-center text-lg font-semibold py-2 px-16 bg-[#4C2A21] rounded-md text-[#FFFFFF]'} type="submit">Зарегистрироваться</button>
                            </form>
                        </div>
                    </div>
                </div>
        </div>

            );
            };

export default Register;
