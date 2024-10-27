import React from "react";
import profile from '../assets/Header icons/profile icon.png'
import notifications from '../assets/Header icons/notifications icon.png'

const Header: React.FC = () => {

    return (
        <header className="flex items-center justify-between py-5">
            <div className='flex w-64 h-16 bg-[#D9D9D9] items-center justify-center ml-14'> <span>Логотип</span> </div>
            <div className="flex items-center mr-[5.188rem]">
                <button className="text-gray-700 text-2xl mr-[1.875rem]"><img src={notifications} alt={'notifications'} /></button>
                <a className='cursor-pointer flex items-center' href='/profile'>
                    <img className='mr-2.5' src={profile} alt={'profile icon'}/>
                    <span className="text-black font-medium text-lg">Анемподистов Андрей Игоревич</span>
                </a>
            </div>
        </header>
    );
};

export default Header;