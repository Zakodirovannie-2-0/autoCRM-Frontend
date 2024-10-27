import React, {useEffect} from 'react';
import Header from "../components/header.tsx";
import Sidebar from "../components/Sidebar.tsx";
import search from '../assets/Clients icons/search icon.png'

const DealsPage : React.FC = () => {
    const fixedElement = document.querySelector('aside') as HTMLElement | null;
    const stopBlock = document.querySelector('footer') as HTMLElement | null;
    const selectBar = document.querySelector('select') as HTMLElement | null;

    useEffect(() => {
        if (fixedElement && stopBlock) {
            window.addEventListener('scroll', () => {
                const stopBlockTop = stopBlock.getBoundingClientRect().top;
                const fixedElementHeight = fixedElement.offsetHeight;

                if (stopBlockTop <= fixedElementHeight) {
                    fixedElement.classList.remove('fixed', 'top-0');
                    fixedElement.classList.add('absolute');
                    fixedElement.style.top = `${stopBlock.offsetTop - fixedElementHeight}px`;
                } else {
                    fixedElement.classList.remove('absolute');
                    fixedElement.classList.add('fixed', 'top-0');
                    fixedElement.style.top = '';
                }
            });
        }
    }, [fixedElement, stopBlock, selectBar])


    return (
        <div className='w-full mx-auto bg-main-bg bg-cover overflow-auto'>
            <div className='flex min-h-screen'>
                <Sidebar/>
                <div className="flex flex-col flex-1 ml-10">
                    <Header/>
                    <div className='flex py-5 px-8 items-center'>
                        <h1 className="text-3.5xl font-bold ml-9 mr-[5.25rem]">СДЕЛКИ</h1>
                        <button className="bg-[#4C2A21] text-white font-semibold font-mont py-2 px-[2.594rem] rounded-md">СОЗДАТЬ</button>
                        <div className='flex w-[520px] h-10 bg-white items-center ml-10 p-2 pt-2.5 border border-gray-400 rounded-md focus:border-gray-400'>
                            <img className='w-[1.875rem] h-[1.875rem]' src={search} alt='search icon' />
                            <input
                                type="text"
                                placeholder="ПОИСК"
                                className="ml-1 h-9 w-full px-4 py-2 text-gray-700 font-light font-mont placeholder-gray-500
                            focus:outline-none "
                            />
                        </div>
                    </div>

                    <div className="flex-1 p-4 overflow-y-auto ml-14">
                        <hr className='w-full h-0.5 text-black bg-black'></hr>
                        <div className='flex min-h-screen flex-row justify-center mt-10 gap-[60px]'>
                            <div className='max-w-sxl w-full max-h-xm h-[800px] bg-gray-100 text-center rounded-md'>
                                <h2 className='text-lg font-semibold  pt-5'>Неподтверждено</h2>
                                <div className='mx-6 bg-[#FFFFFF] pt-3.5 pb-9 gap-6 mt-11 text-left px-14 rounded-md'>
                                    <h2 className='text-lg font-medium '>название услуги</h2>
                                    <h2 className='text-lg font-medium '>фио клиента</h2>
                                    <h2 className='text-lg font-medium '>время записи</h2>
                                </div>
                            </div>
                            <div className='max-w-sxl w-full max-h-xm h-[800px] bg-gray-100 text-center rounded-md'>
                                <h2 className='text-lg font-semibold pt-5'>Подтвержено</h2>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <footer className=" flex bg-[#59636C] text-base text-black py-2 text-center
            font-golos font-[600] mt-auto w-full h-[3.75rem] justify-center items-center">
                <span> Сделано командой “Закодированные 2.0” для Проектного Практикума </span>
            </footer>
        </div>
    );
};

export default DealsPage;