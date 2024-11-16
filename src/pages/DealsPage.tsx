import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import Header from "../components/header.tsx";
import Sidebar from "../components/Sidebar.tsx";
import search from "../assets/Clients icons/search icon.png";
import Footer from "../components/Footer.tsx";
import Modal from "../components/Modal";
import DealsCard from "../components/DealsCard.tsx";
import {setOpen} from "../redux/ModalSlice/modalSlice.ts";
import {useAppDispatch, useAppSelector} from "../hooks/reduxHooks.ts";
import {setDealClient, setDealEmail, setDealName, setDealPhone, setDealTime} from "../redux/DealSlice/dealSlice.ts";  // Импортируем компонент Modal

// Типы для виджетов и задач
interface Widget {
    id: string;
    content: JSX.Element;
}

const DealsPage: React.FC = () => {
    const initialWidgets: Widget[] = [
        {
            id: "widget1",
            content: (
                <div>
                    <h2 className="text-lg font-medium">название услуги</h2>
                    <h2 className="text-lg font-medium">фио клиента</h2>
                    <h2 className="text-lg font-medium">время записи</h2>
                    <p className={'hidden'}>Емейл</p>
                    <p className={'hidden'}>Телефон</p>
                </div>
            ),
        },
    ];

    const [widgets, setWidgets] = useState<Widget[]>(initialWidgets);
    const [confirmedWidgets, setConfirmedWidgets] = useState<Widget[]>([]);
    const [isDragging, setIsDragging] = useState<boolean>(false);

    // console.log('Widgets: ', widgets)
    // console.log('Confirmed widgets: ', confirmedWidgets)

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);  // Состояние для открытия модального окна

    const [serviceName, setServiceName] = useState<string>("");
    const [clientName, setClientName] = useState<string>("");
    const [time, setTime] = useState<string>("");
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const isOpen = useAppSelector(state => state.modal.isOpen);
    const dispatch = useAppDispatch();

    // Функция обработки клика по задаче
    const handleTaskClick = (widget: Widget) => {
        if (isDragging) return;
        dispatch(setOpen(true))
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const [serviceName, clientName, time, email, phone] = React.Children.toArray(widget.content)[0].props.children
        dispatch(setDealName(serviceName.props.children))
        dispatch(setDealClient(clientName.props.children))
        dispatch(setDealTime(time.props.children))
        dispatch(setDealEmail(email.props.children))
        dispatch(setDealPhone(phone.props.children))
    };

    // Функция для добавления новой задачи
    const addNewTask = () => {
        if (serviceName && clientName && time) {
            const newWidget: Widget = {
                id: `widget-${Date.now()}`,  // Уникальный ID для каждой новой задачи
                content: (
                    <div>
                        <h2 className="text-lg font-medium">{serviceName}</h2>
                        <h2 className="text-lg font-medium">{clientName}</h2>
                        <h2 className="text-lg font-medium">{time}</h2>
                        <p className={'hidden'}>{email}</p>
                        <p className={'hidden'}>{phone}</p>
                    </div>
                ),
            };
            setWidgets([...widgets, newWidget]);
            setIsModalOpen(false);  // Закрытие модального окна после добавления задачи
            setServiceName("");  // Очистка полей
            setClientName("");
            setTime("");
        }
    };

    // Обработчик завершения перетаскивания
    const handleOnDragStart = () => {
        setIsDragging(true);
    };

    const handleOnDragEnd = (result: DropResult) => {
        const { source, destination } = result;
        setIsDragging(false);

        if (!destination) return;

        if (source.droppableId === destination.droppableId) {
            if (source.droppableId === "unconfirmed") {
                const items = Array.from(widgets);
                const [reorderedItem] = items.splice(source.index, 1);
                items.splice(destination.index, 0, reorderedItem);
                setWidgets(items);
            } else if (source.droppableId === "confirmed") {
                const items = Array.from(confirmedWidgets);
                const [reorderedItem] = items.splice(source.index, 1);
                items.splice(destination.index, 0, reorderedItem);
                setConfirmedWidgets(items);
            }
        } else if (source.droppableId === "unconfirmed" && destination.droppableId === "confirmed") {
            const sourceItems = Array.from(widgets);
            const [movedItem] = sourceItems.splice(source.index, 1);
            setWidgets(sourceItems);

            const destItems = Array.from(confirmedWidgets);
            destItems.splice(destination.index, 0, movedItem);
            setConfirmedWidgets(destItems);
        } else if (source.droppableId === "confirmed" && destination.droppableId === "unconfirmed") {
            const sourceItems = Array.from(confirmedWidgets);
            const [movedItem] = sourceItems.splice(source.index, 1);
            setConfirmedWidgets(sourceItems);

            const destItems = Array.from(widgets);
            destItems.splice(destination.index, 0, movedItem);
            setWidgets(destItems);
        }
    };

    // Состояние для строки поиска
    const [searchQuery, setSearchQuery] = useState<string>("");

    // Функция для обработки ввода в поле поиска
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const filter = (widget : Widget) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const contentText = React.Children.toArray(widget.content)[0].props.children
            .map((child: React.ReactNode) => {
                if (React.isValidElement(child) && child.props.children) {
                    return child.props.children;
                }
                return null;
            })
            .filter(Boolean)
            .join(' ')
            .toLowerCase();


        return contentText.includes(searchQuery.toLowerCase());
    }

    const filteredWidgets = widgets.filter((widget) => filter(widget));
    const filteredConfirmWidgets = confirmedWidgets.filter((widget) => filter(widget))

    return (
        <div className="w-full mx-auto bg-main-bg bg-cover overflow-auto">
            <div className="flex min-h-screen">
                <Sidebar />
                <div className="flex flex-col flex-1 ml-10">
                    <Header />
                    <div className="flex py-5 px-8 items-center">
                        <h1 className="text-3.5xl font-bold ml-9 mr-[5.25rem]">СДЕЛКИ</h1>
                        <button
                            className="bg-[#4C2A21] text-white font-semibold font-mont py-2 px-[2.594rem] rounded-md"
                            onClick={() => setIsModalOpen(true)}  // Открытие модального окна при клике на кнопку
                        >
                            СОЗДАТЬ
                        </button>
                        <div
                            className="flex w-[520px] h-10 bg-white items-center ml-10 p-2 pt-2.5 border border-gray-400 rounded-md">
                            <img className="w-[1.875rem] h-[1.875rem]" src={search} alt="search icon"/>
                            <input
                                type="text"
                                placeholder="ПОИСК"
                                className="ml-1 h-9 w-full px-4 py-2 text-gray-700 font-light font-mont placeholder-gray-500 focus:outline-none"
                                value={searchQuery}
                                onChange={handleSearchChange} // Обработчик изменения ввода
                            />
                        </div>
                    </div>

                    <DragDropContext onDragStart={handleOnDragStart} onDragEnd={handleOnDragEnd}>
                        <div className="flex-1 p-4 overflow-y-auto ml-14">
                            <hr className="w-full h-0.5 text-black bg-black"/>
                            <div className="widgets flex flex-row justify-center mt-10 gap-[60px]">
                                <Droppable droppableId="unconfirmed">
                                    {(provided) => (
                                        <div
                                            className="flex flex-col max-w-sxl w-full bg-gray-100 text-center rounded-md overflow-y-auto max-h-[80vh]"
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                        >
                                            <h2 className="text-lg font-semibold pt-5">Неподтверждено</h2>
                                            <div className="widgets">
                                                {filteredWidgets.map((widget, index) => (
                                                    <Draggable key={widget.id} draggableId={widget.id} index={index}>
                                                        {(provided) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                className="mx-6 bg-[#FFFFFF] pt-3.5 pb-9 gap-6 mt-11 text-left px-14 rounded-md"
                                                                onClick={() => handleTaskClick(widget)}
                                                            >
                                                                {widget.content}
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        </div>
                                    )}
                                </Droppable>

                                <Droppable droppableId="confirmed">
                                    {(provided) => (
                                        <div
                                            className="flex flex-col max-w-sxl w-full bg-gray-100 text-center rounded-md overflow-y-auto max-h-[80vh]"
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                        >
                                            <h2 className="text-lg font-semibold pt-5">Подтверждено</h2>
                                            <div className="widgets">
                                                {filteredConfirmWidgets.map((widget, index) => (
                                                    <Draggable key={widget.id} draggableId={widget.id} index={index}>
                                                        {(provided) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                className="mx-6 bg-[#FFFFFF] pt-3.5 pb-9 gap-6 mt-11 text-left px-14 rounded-md"
                                                                onClick={() => handleTaskClick(widget)}
                                                            >
                                                                {widget.content}
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        </div>
                                    )}
                                </Droppable>
                            </div>
                        </div>
                    </DragDropContext>
                </div>
            </div>
            <Footer />
            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div>
                    <h2 className="text-xl font-semibold">Создать новую сделку</h2>
                    <div className="mt-4">
                        <input
                            type="text"
                            value={serviceName}
                            onChange={(e) => setServiceName(e.target.value)}
                            placeholder="Название услуги"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mt-4">
                        <input
                            type="text"
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                            placeholder="ФИО клиента"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mt-4">
                        <input
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            placeholder="Время записи"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mt-4">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="E-mail"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mt-4">
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Номер телефона"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mt-6 flex justify-center">
                        <button
                            className="bg-[#4C2A21] text-white font-semibold py-2 px-6 rounded-md"
                            onClick={addNewTask}  // Добавление новой задачи
                        >
                            Добавить задачу
                        </button>
                    </div>
                </div>
            </Modal>
            {isOpen ? <DealsCard onClose={() => dispatch(setOpen(false))}/> : null}
        </div>
    );
};

export default DealsPage;
