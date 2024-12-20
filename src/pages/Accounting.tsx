import Header from "../components/header.tsx";
import Sidebar from "../components/Sidebar.tsx";
import filter from "../assets/Accounting icon/filter.png";
import Footer from "../components/Footer.tsx";
import React, { PureComponent } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Accounting: React.FC = () => {
    const data = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];
    const pieData = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };
    return (
        <div className='w-full mx-auto bg-main-bg bg-cover overflow-auto'>
            <div className='flex min-h-screen'>
                <Sidebar/>
                <div className="flex flex-col flex-1 ml-16">
                    <Header/>

                    <div className='flex py-5 px-8 items-center'>
                        <h1 className="text-4xl font-bold ml-9 mr-10">ОТЧЕТНОСТЬ</h1>
                        <img className='w-[3.125rem] h-[3.125rem]' src={filter} alt='filter'/>
                    </div>
                    <div
                        className="max-w-[107.5rem] w-full rounded-3xl bg-white bg-opacity-80 items-center min-h-[36rem] mt-3 mx-auto flex flex-col">
                        <div className="max-w-6xl w-full">
                            <div className="flex flex-row w-full mt-14 justify-between">
                                <h3 className="text-lg">Выручка</h3>
                                <h3 className="text-lg">Услуги</h3>
                                <h3 className="text-lg">Клиенская база</h3>
                            </div>
                            <div className="flex flex-row w-full mt-10 justify-between">
                                <h3 className="text-lg pl-3.5">23456</h3>
                                <h3 className="text-lg pr-14 ">10</h3>
                            </div>
                        </div>
                        <div className="flex flex-row w-full mt-10 justify-between max-w-[100rem]">
                            <BarChart width={500} height={340} data={data}>
                                <Bar dataKey="uv" fill="#8884d8" />
                            </BarChart>
                            <PieChart width={400} height={400}>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={renderCustomizedLabel}
                                    outerRadius={150}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                            </PieChart>
                            <BarChart
                                width={500}
                                height={340}
                                data={data}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="pv" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                                <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
                            </BarChart>
                        </div>

                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Accounting;
