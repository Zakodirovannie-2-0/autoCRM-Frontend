import React, {useEffect, useState} from "react";
import profile from '../assets/Header icons/profile icon.png'
import notifications from '../assets/Header icons/notifications icon.png'
import NotifModal from "./NotifModal.tsx";
import {getMyInfo} from "../api/api.auth.ts";

const Header: React.FC = () => {
    const notificationModal = document.querySelector('.notifications ul li')
    const [open, setOpen] = useState(false)
    const [full_name, setFull_name] = useState<string>('')
    const [img, setImg] = useState<string>('')

    useEffect(() => {
        const fetchData = async () => {
            await getMyInfo().then(response => {
                setFull_name(response.data.last_name + ' ' + response.data.first_name)
                setImg(response.data.image_url)
            })
        }

        fetchData()
    }, []);


    const handleNotificationsClose = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target !== notificationModal){
            setOpen(false);
        }
    }

    return (
        <header className="flex items-center justify-between py-5">
            <div className='flex w-64 h-16 bg-[#D9D9D9] items-center justify-center ml-14'> <span>Логотип</span> </div>
            <div className="flex items-center mr-[5.188rem]">
                <button className="text-gray-700 text-2xl mr-[1.875rem]"><img src={notifications} alt={'notifications'} onClick={()=>setOpen(true)}/></button>
                {open? <NotifModal onClose={handleNotificationsClose}/> : null}
                <a className='cursor-pointer flex items-center' href='/profile'>
                    <img className='mr-2.5 rounded-full' src={img? img : profile} alt={'profile icon'}/>
                    <span className="text-black font-medium text-lg">{full_name}</span>
                </a>
            </div>
        </header>
    );
};

export default Header;