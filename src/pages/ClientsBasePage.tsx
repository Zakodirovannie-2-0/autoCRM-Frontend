import React, {useEffect, useState} from 'react';
import Header from "../components/header.tsx";
import ClientsTable from "../components/ClientsTable.tsx";
import Sidebar from "../components/Sidebar.tsx";
import ActionButtons from "../components/ActionButtons.tsx";
import search from '../assets/Clients icons/search icon.png'
import Footer from "../components/Footer.tsx";
import {useAppDispatch, useAppSelector} from "../hooks/reduxHooks.ts";
import {setOpen} from "../redux/ModalSlice/modalSlice.ts";
import ClientCard from "../components/ClientCard.tsx";
import {setClientCreation, setClientEmail, setClientName, setClientPhone} from "../redux/ClientSlice/clientSlice.ts";
import {formatDate} from "../utils/utils.ts";

const ClientsBasePage : React.FC = () => {
    const fixedElement = document.querySelector('aside') as HTMLElement | null;
    const stopBlock = document.querySelector('footer') as HTMLElement | null;
    const selectBar = document.querySelector('select') as HTMLElement | null;
    const [selectedClients, setSelectedClients] = useState<number[]>([]);
    const isOpen = useAppSelector((state) => state.modal.isOpen)
    const name = useAppSelector(state => state.client.name)
    const phone = useAppSelector(state => state.client.phone)
    const email = useAppSelector(state => state.client.email)
    const dispatch = useAppDispatch();

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

    // Состояние для строки поиска
    const [searchQuery, setSearchQuery] = useState<string>("");

    // Функция для обработки ввода в поле поиска
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleSelectionChange = (selected: number[]) => {
        setSelectedClients(selected);
    };

    return (
        <div className='w-full mx-auto bg-main-bg bg-cover overflow-auto'>
            <div className='flex min-h-screen'>
                <Sidebar/>
                <div className="flex flex-col flex-1 ml-10">
                    <Header/>

                    <div className='flex py-5 px-8 items-center'>
                        <h1 className="text-3.5xl font-bold ml-9 mr-[5.25rem]">КЛИЕНТЫ</h1>
                        <button className="bg-[#4C2A21] text-white font-semibold font-mont py-2 px-[2.594rem] rounded-md" onClick={() => {
                            dispatch(setClientName(name))
                            dispatch(setClientEmail(email))
                            dispatch(setClientPhone(phone))
                            dispatch(setClientCreation(formatDate(Date.now())))

                            dispatch(setOpen(true))
                        }}>
                            СОЗДАТЬ
                        </button>
                        <div className='flex w-[520px] h-10 bg-white items-center ml-10 p-2 pt-2.5 border border-gray-400 rounded-md focus:border-gray-400'>
                            <img className='w-[1.875rem] h-[1.875rem]' src={search} alt='search icon' />
                            <input
                                type="text"
                                placeholder="ПОИСК"
                                className="ml-1 h-9 w-full px-4 py-2 text-gray-700 font-light font-mont placeholder-gray-500
                            focus:outline-none "
                                onChange={handleSearchChange}
                                value={searchQuery}
                            />
                        </div>
                    </div>

                    <div className="flex-1 p-4 overflow-y-auto ml-14">
                        <ClientsTable searchQuery={searchQuery} onSelectionChange={handleSelectionChange} />
                        <ActionButtons selectedClients={selectedClients}/>
                    </div>
                </div>
            </div>
            <Footer />
            {isOpen? <ClientCard onClose={()=>dispatch(setOpen(false))}/> : null}
        </div>
    );
};

export default ClientsBasePage;
