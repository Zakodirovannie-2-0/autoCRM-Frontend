import React from "react";
type propType = {
    onClose:()=>void;
}

const NotifModal: React.FC<propType> = ({onClose}) => {

    return (
        <div onClick={onClose}
            className={'fixed w-full max-w-xs h-full max-h-24 p-2.5 bg-[#F5D9C4] rounded-md overflow-y-auto font-semibold text-lg style-2'}>
            <ul className={'gap-2.5 text-center'}>
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