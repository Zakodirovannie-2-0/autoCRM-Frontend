import React from "react";
type propType = {
    onClose:(e: React.MouseEvent<HTMLDivElement>) => void;
}

const NotifModal: React.FC<propType> = ({onClose}) => {

    return (
        <div onClick={onClose}
            className={'absolute top-24 right-48 w-full max-w-xs max-h-80 p-2.5 bg-[#F5D9C4] rounded-md overflow-y-auto font-semibold text-lg z-10 notifications'}>
            <ul className={'gap-2.5 text-center space-y-5'}>
                <li>ТЕКСТ УВЕДОМЛЕНИЯ, время</li>
                <li>ТЕКСТ УВЕДОМЛЕНИЯ, время</li>
                <li>ТЕКСТ УВЕДОМЛЕНИЯ, время</li>
                <li>ТЕКСТ УВЕДОМЛЕНИЯ, время</li>
                <li>ТЕКСТ УВЕДОМЛЕНИЯ, время</li>
                <li>ТЕКСТ УВЕДОМЛЕНИЯ, время</li>
                <li>ТЕКСТ УВЕДОМЛЕНИЯ, время</li>
                <li>ТЕКСТ УВЕДОМЛЕНИЯ, время</li>
                <li>ТЕКСТ УВЕДОМЛЕНИЯ, время</li>
                <li>ТЕКСТ УВЕДОМЛЕНИЯ, время</li>
                <li>ТЕКСТ УВЕДОМЛЕНИЯ, время</li>
                <li>ТЕКСТ УВЕДОМЛЕНИЯ, время</li>
                <li>ТЕКСТ УВЕДОМЛЕНИЯ, время</li>
                <li>ТЕКСТ УВЕДОМЛЕНИЯ, время</li>
                <li>ТЕКСТ УВЕДОМЛЕНИЯ, время</li>
                <li>ТЕКСТ УВЕДОМЛЕНИЯ, время</li>
                <li>ТЕКСТ УВЕДОМЛЕНИЯ, время</li>
                <li>ТЕКСТ УВЕДОМЛЕНИЯ, время</li>
            </ul>
        </div>
    );
};

export default NotifModal;