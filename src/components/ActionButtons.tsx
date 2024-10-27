import React from 'react';

const ActionButtons: React.FC = () => {
    return (
        <div className="flex space-x-4 py-4">
            <button className="bg-[#4C2A21] text-white py-2 px-11 rounded-md">Удалить</button>
            <button className="bg-[#4C2A21] text-white py-2 px-4 rounded-md">Добавить заметку</button>
        </div>
    );
};

export default ActionButtons;