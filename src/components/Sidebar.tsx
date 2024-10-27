import React from 'react';
import burger from '../assets/Sidebar icons/burger icon.png';
import clients from '../assets/Sidebar icons/clients icon.png'
import tasks from '../assets/Sidebar icons/tasks icon.png'
import deals from '../assets/Sidebar icons/deals icon.png'
import analytics from '../assets/Sidebar icons/analytics icon.png'
import settings from '../assets/Sidebar icons/settings icon.png'

const Sidebar: React.FC = () => {

    return (
        <aside className={`fixed w-[4.375rem] h-screen flex flex-col items-center py-4 space-y-4 bg-[#F5D9C4]
        bg-opacity-65`}>
            <img src={burger} alt={'burger icon'} className='mb-6 mt-1'/>
            <nav className="flex flex-col space-y-9 items-center">
                <button className="text-2xl text-gray-900"><img src={clients} alt={'clients icon'}/></button>
                <button className="text-2xl text-gray-900"><img src={tasks} alt={'tasks icon'}/></button>
                <button className="text-2xl text-gray-900"><img src={deals} alt={'deals icon'}/></button>
                <button className="text-2xl text-gray-900"><img src={analytics} alt={'analytics icon'}/></button>
            </nav>
            <button className="text-2xl text-gray-900" style={{marginTop: '36.438rem'}}>
                <img src={settings} alt={'settings icon'}/>
            </button>
        </aside>
    );
};

export default Sidebar;