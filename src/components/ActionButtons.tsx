import React from 'react';
import {deleteClients} from "../api/api.ts";
import {useAppSelector} from "../hooks/reduxHooks.ts";


const ActionButtons: React.FC = () => {
    const selectedClients = useAppSelector(state => state.client.id)

    const handleDelete = (ids: number[]) => {
        deleteClients(ids)
    }

    return (
        <div className="flex space-x-4 py-4">
            <button className="bg-[#4C2A21] text-white py-2 px-11 rounded-md"
                    onClick={() => handleDelete(selectedClients)}
            >
                Удалить</button>
            <button className="bg-[#4C2A21] text-white py-2 px-4 rounded-md">Добавить заметку</button>
        </div>
    );
};

export default ActionButtons;