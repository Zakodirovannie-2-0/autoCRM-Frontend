import React, {useEffect, useState} from 'react';
import Sidebar from "../components/Sidebar.tsx";
import Footer from "../components/Footer.tsx";
import {getMyInfo, logout} from "../api/api.ts";
import image from "../assets/profileImg.svg";
import Header from "../components/header.tsx";

interface inputs {
    'ФИО': string,
    'Должность': string,
    'E-mail': string,
    'Телефон': string,
    'Дата регистрации': string,
    image_url?: string
}

const Profile : React.FC = () => {
    const [user, setUser] = useState<inputs>({
        'ФИО': 'Анемподистов Андрей Игоревич',
        'Должность': 'Разработчик',
        'E-mail': 'XxqD3@example.com',
        'Телефон': '+7 (999) 999-99-99',
        'Дата регистрации': '12.01.2022',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
        await getMyInfo().then((response) => {
            setUser({
                'ФИО': response.data.last_name + ' ' + response.data.first_name,
                'Должность': response.data.is_owner,
                'E-mail': response.data.email,
                'Телефон': response.data.phone_number,
                'Дата регистрации': response.data.date_joined
        });
        }); } catch (error) {
                console.log(error);
            }
    };

        fetchData();
    }, []);

    return <>
        <div className={`w-full min-h-screen mx-auto bg-main-bg bg-cover`}>
            <Sidebar/>
            <div className={`min-h-dvh flex flex-col flex-1 ml-10 `}>
                <Header />
                <div className={`w-full h-screen flex mx-auto`}>
                    <div className={`ml-[21.875rem] mt-[7.375rem]`}>
                        {Object.entries(user).map(([key, value]) =>
                            <div className='flex flex-col mt-[3.125rem]' key={key}>
                                <label htmlFor={key} className='text-lg font-bold font-golos'>{key}</label>
                                <input id={key} className='w-[31.25rem] h-10 mt-2.5 text-lg font-medium font-golos
                        rounded-md p-2 disabled:bg-[#FFFFFF] focus:outline-none'
                                       style={{boxShadow: '4px 4px 20px 0px rgba(0, 0, 0, 0.25)'}}
                                       value={value} readOnly/>
                            </div>
                        )}
                        <button className='text-center text-lg font-semibold button py-2 px-11 bg-[#4C2A21]
                rounded-md text-[#FFFFFF] mt-20 hover:bg-[#ffffff] hover:text-[#000000] mb-10'
                                onClick={() => window.location.assign('/changePassword')}>
                            Изменить пароль
                        </button>
                        <button className='text-center text-lg font-semibold button py-2 px-11 bg-[#4C2A21]
                rounded-md text-[#FFFFFF] mt-20 hover:bg-[#ffffff] hover:text-[#000000] mb-10'
                                onClick={() => logout()}>
                            Выйти
                        </button>
                    </div>
                    <div>
                        <div
                            className={`relative max-w-[31.25rem] max-h-[31.25rem] object-contain ml-[13.75rem] mt-[12rem]`}>
                            <img
                                className={`min-h-[31.25rem] min-w-min`}
                                src={user.image_url ? user.image_url : image}
                                alt="Аватарка"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    </>

};

export default Profile;