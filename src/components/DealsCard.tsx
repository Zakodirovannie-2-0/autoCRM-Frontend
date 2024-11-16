import React from "react";
import {setOpen} from "../redux/ModalSlice/modalSlice.ts";
import {useAppDispatch, useAppSelector} from "../hooks/reduxHooks.ts";
import {setDealClient, setDealEmail, setDealName, setDealPhone, setDealTime} from "../redux/DealSlice/dealSlice.ts";

type propTypes = {
    onClose: ()=>void;
}

const DealsCard: React.FC<propTypes> = ({onClose}) => {
    const dealName = useAppSelector(state => state.deal.name)
    const dealTime = useAppSelector(state => state.deal.time)
    const dealClient = useAppSelector(state => state.deal.client)
    const dealPhone = useAppSelector(state => state.deal.phone)
    const dealEmail = useAppSelector(state => state.deal.email)
    const dispatch = useAppDispatch();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        //Запрос отправки
        dispatch(setOpen(false))
    }

    return (
        <form onSubmit={event => handleSubmit(event)}
              className={'flex flex-col h-dvh bg-[#F5D9C4] absolute inset-y-0 z-10 right-0 max-w-xm w-full px-12 py-16'}>

            <button type={'button'}
                    className="absolute top-2 right-2 py-1 px-2
                    border border-neutral-200 rounded-md text-gray-400
                    bg-white hover:bg-gray-50 hover:text-gray-600"
                    onClick={onClose}
            >
                X
            </button>

            <input className={'text-2xl font-semibold text-black bg-transparent'}
                   value={dealName ? dealName : 'Название услуги'} onChange={(event) => dispatch(setDealName(event.target.value))}
            />
            <div className='flex flex-col mt-24'>
                <label className='text-lg font-bold font-golos'>Время записи</label>
                <input className='w-[31.25rem] h-10 mt-2.5 text-lg font-medium font-golos
                        rounded-md p-2 disabled:bg-[#FFFFFF] focus:outline-none shadow-xl'
                       value={dealTime} onChange={(event) => dispatch(setDealTime(event.target.value))}
                />
            </div>
            <div className='flex flex-col mt-10'>
                <label className='text-lg font-bold font-golos'>ФИО</label>
                <input className='w-[31.25rem] h-10 mt-2.5 text-lg font-medium font-golos
                        rounded-md p-2 disabled:bg-[#FFFFFF] focus:outline-none shadow-xl'
                    value={dealClient} onChange={(event) => dispatch(setDealClient(event.target.value))}
                />
            </div>
            <div className='flex flex-col mt-10'>
                <label className='text-lg font-bold font-golos'>Телефон</label>
                <input className='w-[31.25rem] h-10 mt-2.5 text-lg font-medium font-golos
                        rounded-md p-2 disabled:bg-[#FFFFFF] focus:outline-none shadow-xl'
                       value={dealPhone} onChange={(event) => dispatch(setDealPhone(event.target.value))}
                />
            </div>
            <div className='flex flex-col mt-10'>
                <label className='text-lg font-bold font-golos'>Почта</label>
                <input className='w-[31.25rem] h-10 mt-2.5 text-lg font-medium font-golos
                        rounded-md p-2 disabled:bg-[#FFFFFF] focus:outline-none shadow-xl'
                       value={dealEmail} onChange={(event) => dispatch(setDealEmail(event.target.value))}
                />
            </div>
            <div className={'flex flex-row gap-10 justify-center mt-80'}>
                <button type={"submit"}
                    className={'text-center text-lg font-semibold button py-2 px-11 bg-[#4C2A21] rounded-md text-[#FFFFFF] btn'}>сохранить
                </button>
                <button type={"reset"}
                    className={'text-center text-lg font-semibold button py-2 px-11 bg-[#4C2A21] rounded-md text-[#FFFFFF] btn'}>сбросить
                </button>
            </div>
        </form>
    );
};

export default DealsCard;