import React, {useState} from 'react';
import Pagination from "./Pagination.tsx";

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

const ClientsTable: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);

    // Рассчитываем индекс первой и последней записи для текущей страницы
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

    // Обработчики для смены страницы и изменения количества записей на странице
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleItemsPerPageChange = (newItemsPerPage: number) => {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1); // Сброс на первую страницу при изменении количества записей
    };

    // Количество страниц
    const totalPages = Math.ceil(items.length / itemsPerPage);

    return <>
        <div className="max-w-[107.5rem] w-full rounded-3xl bg-white bg-opacity-80 items-center min-h-[36rem] mt-3">
            <table className="max-w-[107.5rem] table-auto w-full h-full rounded-2xl">
                <thead>
                <tr className="text-black text-lg border-b border-black ">
                    <th className="text-center pt-8 pb-3 pl-5">
                        <input type="checkbox" className="form-checkbox h-5 w-5 text-gray-600"/>
                    </th>
                    <th className="text-center pt-8 pb-3 pl-5">ID</th>
                    <th className="text-left pt-8 pb-3 pl-5">Клиент</th>
                    <th className="text-left pt-8 pb-3 pl-5">Номер телефона</th>
                    <th className="text-left pt-8 pb-3 pl-5">Почта</th>
                    <th className="text-left pt-8 pb-3 pl-5">Дата создания</th>
                </tr>
                </thead>
                <tbody style={{maxHeight: '28rem'}}>
                {currentItems.map((item) => (
                    <tr className="text-lg h-[2.6rem] border-b border-gray-600" key={item.id}>
                        <td className="text-center pl-5 pt-4">
                            <input type="checkbox" className="form-checkbox h-5 w-5 text-gray-600"/>
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
    </>;
};

export default ClientsTable;