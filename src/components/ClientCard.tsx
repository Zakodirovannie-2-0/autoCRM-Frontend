import React from "react";

const ClientCard: React.FC = () => {

    return (
        <div className={'flex flex-col h-dvh bg-[#F5D9C4] absolute inset-y-0 z-10 right-0 max-w-xm w-full px-12 py-16'}>
            <h2 className={'text-2xl font-semibold text-black'}>ФИО</h2>
            <div className={'flex flex-row mt-7 gap-10'}>
                <button
                    className={'text-center text-lg font-semibold button py-2 px-11 bg-[#4C2A21] rounded-md text-[#FFFFFF] btn'}>информация
                </button>
                <button
                    className={'text-center text-lg font-semibold button py-2 px-11 bg-[#4C2A21] rounded-md text-[#FFFFFF] btn'}>история
                </button>
            </div>
            <div className='flex flex-col mt-10'>
                <label className='text-lg font-bold font-golos'>E-mail</label>
                <input className='w-[31.25rem] h-10 mt-2.5 text-lg font-medium font-golos
                        rounded-md p-2 disabled:bg-[#FFFFFF] focus:outline-none shadow-xl'/>
            </div>
            <div className='flex flex-col mt-10'>
                <label className='text-lg font-bold font-golos'>Телефон</label>
                <input className='w-[31.25rem] h-10 mt-2.5 text-lg font-medium font-golos
                        rounded-md p-2 disabled:bg-[#FFFFFF] focus:outline-none shadow-xl'/>
            </div>
            <div className='flex flex-col mt-10'>
                <label className='text-lg font-bold font-golos'>Дата создания</label>
                <input className='w-[31.25rem] h-10 mt-2.5 text-lg font-medium font-golos
                        rounded-md p-2 disabled:bg-[#FFFFFF] focus:outline-none shadow-xl'/>
            </div>
            <div className='flex flex-col mt-10'>
                <label className='text-lg font-bold font-golos'>Заметка</label>
                <textarea className='w-[31.25rem]  mt-2.5 text-lg font-medium font-golos
                        rounded-md p-2 disabled:bg-[#FFFFFF] focus:outline-none shadow-xl resize-none' rows="5"
                          cols="33"/>
            </div>
            <div className={'flex flex-row gap-10 justify-center mt-56'}>
                <button
                    className={'text-center text-lg font-semibold button py-2 px-11 bg-[#4C2A21] rounded-md text-[#FFFFFF] btn'}>сохранить
                </button>
                <button
                    className={'text-center text-lg font-semibold button py-2 px-11 bg-[#4C2A21] rounded-md text-[#FFFFFF] btn'}>сбросить
                </button>
            </div>
        </div>
    );
};

export default ClientCard;