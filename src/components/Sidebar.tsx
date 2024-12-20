import React, {useState} from 'react';
import burger from '../assets/Sidebar icons/burger icon.png';
import clients from '../assets/Sidebar icons/clients icon.png'
import tasks from '../assets/Sidebar icons/tasks icon.png'
import deals from '../assets/Sidebar icons/deals icon.png'
import analytics from '../assets/Sidebar icons/analytics icon.png'
import settings from '../assets/Sidebar icons/settings icon.png'

const Sidebar: React.FC = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <aside className={`transform duration-300 ease-in-out ${isHovered? `fixed w-[20rem] h-screen flex flex-col items-start py-4 pl-4 space-y-4 bg-[#F5D9C4] bg-opacity-65`
            : `fixed w-[4.375rem] h-screen flex flex-col items-center py-4 space-y-4 bg-[#F5D9C4] bg-opacity-65`}`}
               onMouseEnter={() => setIsHovered(true)}
               onMouseLeave={() => setIsHovered(false)}>
            <img src={burger} alt={'burger icon'} className='mb-6 mt-1' />
            <nav className="flex flex-col space-y-9 items-start">
                <button className="text-2xl text-gray-900 flex items-center" onClick={() => window.location.assign('/clients')}>
                    <img src={clients} alt={'clients icon'}/>
                    {isHovered? <p className='pl-4'>База клиентов</p> : null}
                </button>
                <button className="text-2xl text-gray-900 flex items-center" onClick={() => window.location.assign('/tasks')} >
                    <img src={tasks} alt={'tasks icon'}/>
                    {isHovered? <p className='pl-4'>Задачи</p> : null}
                </button>
                <button className="text-2xl text-gray-900 flex items-center" onClick={() => window.location.assign('/deals')}>
                    <img src={deals} alt={'deals icon'}/>
                    {isHovered? <p className='pl-4'>Воронка сделок</p> : null}
                </button>
                <button className="text-2xl text-gray-900 flex items-center" onClick={() => window.location.assign('/accounting')}>
                    <img src={analytics} alt={'analytics icon'}/>
                    {isHovered? <p className='pl-4'>Аналитика</p> : null}
                </button>
            </nav>
            <button className="text-2xl text-gray-900" style={{marginTop: '36.438rem'}}>
                <img src={settings} alt={'settings icon'}/>
            </button>
        </aside>
    );
};

export default Sidebar;