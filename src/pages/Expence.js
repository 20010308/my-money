import React from 'react';
import Layout from "../component/Layout";

const Expence = (props) => {

    const data = [
        {
            date: "21.01.2003",
            summ: "50000",
            why: "To'yga",
            auto: "true"
        },
        {
            date: "21.01.2003",
            summ: "50000",
            why: "To'yga",
            auto: "true"
        },
        {
            date: "21.01.2003",
            summ: "50000",
            why: "To'yga",
            auto: "true"
        },
        {
            date: "21.01.2003",
            summ: "50000",
            why: "To'yga",
            auto: "true"
        },
        {
            date: "21.01.2003",
            summ: "50000",
            why: "To'yga",
            auto: "true"
        },
        {
            date: "21.01.2003",
            summ: "50000",
            why: "To'yga",
            auto: "true"
        },

    ];

    return (
        <Layout history={props.history}>
            <table className="table table-hover table-striped">
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Summa</th>
                    <th>Why ?</th>
                    <th>Auto</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item, index) => {
                    return (
                        <tr key={index}>
                            <td>{item.date}</td>
                            <td>{item.summ}</td>
                            <td>{item.why}</td>
                            <td>{item.auto}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
            <div className='position-fixed d-flex w-75 justify-content-end pb-4' style={{bottom: '0', right: "30px"}}>
                <button className='btn btn-danger'>+ Add</button>
                <button className='btn btn-success ms-5'>Download</button>
            </div>
        </Layout>
    );
};

export default Expence;