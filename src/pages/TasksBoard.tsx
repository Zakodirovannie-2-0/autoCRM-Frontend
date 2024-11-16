import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import Header from "../components/header.tsx";
import Sidebar from "../components/Sidebar.tsx";
import search from '../assets/Clients icons/search icon.png';
import Footer from "../components/Footer.tsx";
import Modal from '../components/Modal.tsx';

interface Task {
    id: string;
    title: string;
    description: string;
    executor: string;
    status: string;
}

const initialTasks: Task[] = [
    { id: '1', title: 'Задача 1', description: 'Описание задачи 1', executor: 'Исполнитель 1', status: 'К выполнению' },
    { id: '2', title: 'Задача 2', description: 'Описание задачи 2', executor: 'Исполнитель 2', status: 'В работе' },
    { id: '3', title: 'Задача 3', description: 'Описание задачи 3', executor: 'Исполнитель 3', status: 'На проверке' },
];

const columnTitles: string[] = ['К выполнению', 'В работе', 'На проверке', 'Готово'];

const TasksBoard: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [isNewTask, setIsNewTask] = useState<boolean>(false);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const updatedTasks = Array.from(tasks);
        const [movedTask] = updatedTasks.splice(result.source.index, 1);
        movedTask.status = columnTitles[parseInt(result.destination.droppableId)];
        updatedTasks.splice(result.destination.index, 0, movedTask);

        setTasks(updatedTasks);
    };

    const handleTaskClick = (task: Task) => {
        setSelectedTask(task);
        setIsNewTask(false);
        setIsModalOpen(true);
    };

    const handleCreateTask = () => {
        setSelectedTask({ id: '', title: '', description: '', executor: '', status: 'К выполнению' });
        setIsNewTask(true);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleTaskChange = (field: keyof Task, value: string) => {
        if (selectedTask) {
            const updatedTask = { ...selectedTask, [field]: value };
            setSelectedTask(updatedTask);
        }
    };

    const handleSaveTask = () => {
        if (selectedTask) {
            if (isNewTask) {
                const newTask = { ...selectedTask, id: (tasks.length + 1).toString() };
                setTasks([...tasks, newTask]);
            } else {
                setTasks(tasks.map(task => task.id === selectedTask.id ? selectedTask : task));
            }
            setIsModalOpen(false);
        }
    };

    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.executor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className='w-full mx-auto bg-main-bg bg-cover overflow-auto'>
            <div className='flex min-h-screen'>
                <Sidebar />
                <div className="flex flex-col flex-1 ml-10">
                    <Header />
                    <div className='flex py-5 px-8 items-center'>
                        <h1 className="text-3.5xl font-bold ml-9 mr-[5.25rem]">ЗАДАЧИ</h1>
                        <button
                            onClick={handleCreateTask}
                            className="bg-[#4C2A21] text-white font-semibold font-mont py-2 px-[2.594rem] rounded-md"
                        >
                            СОЗДАТЬ
                        </button>
                        <div className='flex w-[520px] h-10 bg-white items-center ml-10 p-2 pt-2.5 border border-gray-400 rounded-md focus:border-gray-400'>
                            <img className='w-[1.875rem] h-[1.875rem]' src={search} alt='search icon' />
                            <input
                                type="text"
                                placeholder="ПОИСК"
                                className="ml-1 h-9 w-full px-4 py-2 text-gray-700 font-light font-mont placeholder-gray-500 focus:outline-none "
                                onChange={handleSearchChange}
                                value={searchQuery}
                            />
                        </div>
                    </div>

                    <DragDropContext onDragEnd={handleDragEnd}>
                        <div className="tasks-board flex flex-row justify-center mt-10 gap-5 min-h-fit h-[448px]">
                            {columnTitles.map((title, index) => (
                                <Droppable key={index} droppableId={index.toString()}>
                                    {(provided) => (
                                        <div
                                            className={'flex flex-col max-w-xsm w-full bg-gray-100 text-center rounded-md overflow-y-auto max-h-[80vh]'}
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                        >
                                            <h2 className="text-lg font-semibold pt-5">{title}</h2>
                                            {filteredTasks.filter(task => task.status === title).map((task, i) => (
                                                <Draggable key={task.id} draggableId={task.id} index={i}>
                                                    {(provided) => (
                                                        <div
                                                            className="mx-6 bg-[#FFFFFF] gap-6 mt-4 text-left rounded-md p-2.5 cursor-pointer"
                                                            onClick={() => handleTaskClick(task)}
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                        >
                                                            <h3 className={'text-lg font-semibold'}>{task.title}</h3>
                                                            <p className={'text-sm mt-2'}>{task.executor}</p>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            ))}
                        </div>
                    </DragDropContext>
                </div>
            </div>
            {selectedTask && (
                <Modal open={isModalOpen} onClose={handleModalClose}>
                    <div className='flex flex-col'>
                        <label className='font-bold'>Название:</label>
                        <input
                            type='text'
                            value={selectedTask.title}
                            onChange={(e) => handleTaskChange('title', e.target.value)}
                            className='border rounded-md p-2 mb-4'
                        />
                        <label className='font-bold'>Исполнитель:</label>
                        <input
                            type='text'
                            value={selectedTask.executor}
                            onChange={(e) => handleTaskChange('executor', e.target.value)}
                            className='border rounded-md p-2 mb-4'
                        />
                        <label className='font-bold'>Описание:</label>
                        <textarea
                            value={selectedTask.description}
                            onChange={(e) => handleTaskChange('description', e.target.value)}
                            className='border rounded-md p-2 mb-4'
                        />
                        <button
                            onClick={handleSaveTask}
                            className='bg-[#4C2A21] text-white font-semibold font-mont rounded-md p-2 mt-2'
                        >
                            Сохранить
                        </button>
                    </div>
                </Modal>
            )}
            <Footer />
        </div>
    );
};

export default TasksBoard;
