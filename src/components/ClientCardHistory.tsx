import React from "react";

const ClientCardHistory: React.FC = () => {

    return (
        <div className={'flex flex-col h-dvh bg-[#F5D9C4] absolute inset-y-0 z-10 right-0 max-w-xm w-full py-16'}>
            <div className={'px-12'}>
                    <h2 className={'text-2xl font-semibold text-black'}>ФИО</h2>
                    <div className={'flex flex-row mt-7 gap-10'}>
                        <button
                            className={'text-center text-lg font-semibold button py-2 px-11 bg-[#4C2A21] rounded-md text-[#FFFFFF] btn'}>информация
                        </button>
                        <button
                            className={'text-center text-lg font-semibold button py-2 px-11 bg-[#4C2A21] rounded-md text-[#FFFFFF] btn'}>история
                        </button>
                    </div>
            </div>
            <div className={'flex flex-row mt-10 border-b border-t border-black w-full gap-24 py-2.5'}>
                <h3 className={'text-black text-lg pl-12'}>Дата/Время</h3>
                <h3 className={'text-black text-lg'}>Услуга</h3>
            </div>
        </div>
    );
};

export default ClientCardHistory;