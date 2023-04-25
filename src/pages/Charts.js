import React from 'react';
import Layout from "../component/Layout";
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Area,
    AreaChart,
    Tooltip,
    Legend,
    Bar,
    BarChart,
    Pie, Cell, PieChart
} from "recharts";

const Charts = (props) => {

    const data = [
        {
            name: 'Yanvar',
            uv: 4000,
        },
        {
            name: 'Fevral',
            uv: 3000,
        },
        {
            name: 'Mart',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Aprel',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'May',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
        {
            name: 'Iyun',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Iyul',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Avgust',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
        {
            name: 'Sentabr',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Oktabr',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Noyabr',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Dekabr',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },

    ];
    // const colors = ['red', 'blue', 'white', 'black','red', 'blue', 'white', 'black','red', 'blue', 'white', 'black'];

    return (
        <Layout history={props.history}>
            <div className="container">
                <div className="row">
                    <div className="col-11 text-center mb-5 overflow-auto">
                        <h4>Bir yillik kirim chiqim grafigi</h4>
                        <LineChart width={1100} height={250} data={data}>
                            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                            <CartesianGrid stroke="#ccc" />
                            <XAxis dataKey="name" />
                            <YAxis />
                        </LineChart>
                    </div>
                    <div className="col-11 text-center mb-5 overflow-auto">
                        <h4>Yillik grafik</h4>
                        <AreaChart width={1100} height={250} data={data}
                                   margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                            <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                        </AreaChart>
                    </div>
                    <div className="col-11 mb-5 text-center overflow-auto">
                        <h4>Grafik</h4>
                        <BarChart width={1100} height={250} data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="pv" fill="#8884d8" />
                            <Bar dataKey="uv" fill="#82ca9d" />
                        </BarChart>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Charts;