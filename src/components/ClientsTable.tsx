import React, {useEffect, useState} from 'react';
import Pagination from "./Pagination.tsx";
import {useAppDispatch} from "../hooks/reduxHooks.ts";
import {setOpen} from "../redux/ModalSlice/modalSlice.ts";
import {
    setClientCreation,
    setClientEmail,
    setClientName,
    setClientPhone
} from "../redux/ClientSlice/clientSlice.ts";

interface Item {
    id: number;
    name: string;
    phone: string;
    email: string;
    creation_date: string;
}

const items: Item[] = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: 'Стрижак Мария Олеговна',
    phone: '+7 (919) --- --',
    email: 'maria.strizhak1@mail.ru',
    creation_date: '08.09.2024'
}));

type propTypes = {
    searchQuery: string;
    onSelectionChange: (selectedClients: number[]) => void;
}

const ClientsTable: React.FC<propTypes> = ({searchQuery, onSelectionChange}) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);
    const [selectedClients, setSelectedClients] = useState<Set<number>>(new Set());
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (selectedClients.size > 0) {
            onSelectionChange(Array.from(selectedClients));
        }
    }, [selectedClients, onSelectionChange]);

    // Filter the clients based on the search query
    const filteredClients = items.filter((item) => {
        // Extract all string-type properties from the item object
        const contentText = Object.values(item)
            .filter(value => typeof value === 'string')
            .join(' ')
            .toLowerCase();

        return contentText.includes(searchQuery.toLowerCase());
    });

    // Calculate the indices for pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredClients.slice(indexOfFirstItem, indexOfLastItem);

    // Handlers for page and item per page changes
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleItemsPerPageChange = (newItemsPerPage: number) => {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1); // Reset to first page on items per page change
    };

    // Handler for selecting/deselecting a client
    const handleSelectClient = (id: number) => {
        setSelectedClients(prevSelected => {
            const newSelected = new Set(prevSelected);
            if (newSelected.has(id)) {
                newSelected.delete(id);
            } else {
                newSelected.add(id);
            }
            return newSelected;
        });
    };

    // Handler for selecting/deselecting all clients
    const handleSelectAll = () => {
        if (selectedClients.size === currentItems.length) {
            setSelectedClients(new Set());
        } else {
            const allIds = currentItems.map(item => item.id);
            setSelectedClients(new Set(allIds));
        }
    };

    // Total pages calculation based on filtered results
    const totalPages = Math.ceil(filteredClients.length / itemsPerPage);

    return (
        <div className="max-w-[107.5rem] w-full rounded-3xl bg-white bg-opacity-80 items-center min-h-[36rem] mt-3">
            <table className="max-w-[107.5rem] table-auto w-full h-full rounded-2xl">
                <thead>
                <tr className="text-black text-lg border-b border-black">
                    <th className="text-center pt-8 pb-3 pl-5">
                        <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-gray-600"
                            onChange={handleSelectAll}
                            checked={selectedClients.size === currentItems.length && currentItems.length > 0}
                        />
                    </th>
                    <th className="text-center pt-8 pb-3 pl-5">ID</th>
                    <th className="text-left pt-8 pb-3 pl-5">Клиент</th>
                    <th className="text-left pt-8 pb-3 pl-5">Номер телефона</th>
                    <th className="text-left pt-8 pb-3 pl-5">Почта</th>
                    <th className="text-left pt-8 pb-3 pl-5">Дата создания</th>
                </tr>
                </thead>
                <tbody style={{ maxHeight: '28rem' }}>
                {currentItems.map((item) => (
                    <tr className="text-lg h-[2.6rem] border-b border-gray-600" key={item.id} onClick={() => {
                        dispatch(setClientName(item.name))
                        dispatch(setClientEmail(item.email))
                        dispatch(setClientPhone(item.phone))
                        dispatch(setClientCreation(item.creation_date))
                        dispatch(setOpen(true));
                    }}>
                        <td className="text-center pl-5 pt-4">
                            <input
                                type="checkbox"
                                className="form-checkbox h-5 w-5 text-gray-600"
                                onChange={() => handleSelectClient(item.id)}
                                checked={selectedClients.has(item.id)}
                            />
                        </td>
                        <td className="text-center pl-5 pt-2">{item.id}</td>
                        <td className="text-left pl-5 pt-2">{item.name}</td>
                        <td className="text-left pl-5 pt-2">{item.phone}</td>
                        <td className="text-left pl-5 pt-2">{item.email}</td>
                        <td className="text-left pl-5 pt-2">{item.creation_date}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
                onItemsPerPageChange={handleItemsPerPageChange}
            />
        </div>
    );
};


export default ClientsTable;