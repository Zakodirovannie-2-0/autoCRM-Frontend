import React, {useEffect, useState} from 'react';
import sideImage from '../assets/sideImg.png'
import {getServices} from "../api/api.ts";
// import { postWidget} from "../api/api.ts";

interface Service {
    id: number;
    name: string;
    description: string;
    price: number;
}

export interface FormDataWidget {
    full_name: string;
    email: string
    phone: string
    service_id: number
    date: string
    time: string
}

const WidgetPage: React.FC = () => {
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        phone: '',
        service_id: 0,
        date: '',
        time: '',
    });
    const [services, setServices] = useState<Service[]>([]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await getServices();
                setServices(response.data);
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };

        fetchServices();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.date || !formData.time) {
            console.error('Дата и время обязательны');
            return;
        }

        // postWidget(formData)
        console.log('Form Data Submitted:', formData);
        window.location.reload();
    };
    return (
        <div className="bg-main-bg">
            <div className='min-h-screen flex items-center justify-between mx-80'>
                <img src={sideImage} alt={'Side content'}/>
                <form className="w-full max-w-[37.5rem] bg-transparent p-8 rounded-lg flex flex-col"
                onSubmit={handleSubmit}>
                    <h1 className="text-4xl font-bold text-center mb-6">Запись на услуги</h1>

                    <div className="mb-4">
                        <label htmlFor="full_name" className="block text-lg font-medium text-black">
                            ФИО
                        </label>
                        <input
                            type="text"
                            id="full_name"
                            value={formData.full_name}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-lg font-medium text-black">
                            E-mail
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-lg font-medium text-black">
                            Телефон
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="service_id" className="block text-lg font-medium text-black">
                            Услуги для записи
                        </label>
                        <select
                            id="service_id"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            value={formData.service_id}
                            onChange={handleChange}
                        >
                            <option value="">Выберите услугу</option>
                            {services.map((service, index) => (
                                <option key={index} value={service.id}>{service.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4 flex justify-between gap-4">
                        <div className="flex-1">
                            <label htmlFor="date" className="block text-lg font-medium text-black">
                                Дата
                            </label>
                            <input
                                type="date"
                                id="date"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                value={formData.date}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="time" className="block text-lg font-medium text-black">
                                Время
                            </label>
                            <select
                                id="time"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                value={formData.time}
                                onChange={handleChange}
                            >
                                <option value="">Выберите время</option>
                                <option value="10:00">10:00</option>
                                <option value="11:00">11:00</option>
                            </select>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className='text-center text-lg font-semibold button py-2 px-11 w-64
                        bg-[#4C2A21] rounded-md text-[#FFFFFF] mt-20 hover:bg-[#ffffff] hover:text-[#000000] mb-10
                        self-center'
                    >
                        Отправить заявку
                    </button>
                </form>
            </div>
        </div>
    );
};

export default WidgetPage;