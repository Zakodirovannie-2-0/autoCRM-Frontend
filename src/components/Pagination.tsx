import React from 'react';
import previous from '../assets/Clients icons/previous icon.png'
import next from '../assets/Clients icons/next icon.png'
interface PaginationProps {
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
    onItemsPerPageChange: (itemsPerPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
                                                   currentPage,
                                                   totalPages,
                                                   itemsPerPage,
                                                   onPageChange,
                                                   onItemsPerPageChange,
                                               }) => {
    return (
        <div className="flex items-center justify-end p-4 border-t text-gray-700 w-full">
            <div className="absolute left-1/2 items-center space-x-2 ">
                    <button
                        className="text-lg text-gray-700"
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                    <img src={previous} alt='previous' />
                </button>
                <span>Страница {currentPage}</span>
                    <button
                        className="text-lg text-gray-700"
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        <img src={next} alt='next'/>
                    </button>
            </div>
            <label className="flex items-center space-x-2">
                <span>на странице</span>
                    <select
                        className="border border-gray-300 rounded py-1 px-2 cursor-pointer"
                        value={itemsPerPage}
                        onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
                    >
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                    </select>
            </label>
        </div>
    );
};

export default Pagination;