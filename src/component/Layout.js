import React, {useEffect, useState} from 'react';
import {IoMenu} from 'react-icons/io5'
import {Link, useLocation} from "react-router-dom";
import {BiSearch} from "react-icons/bi";
import {FaRegUserCircle} from "react-icons/fa";
import {CgArrowBottomRightO} from "react-icons/cg";

const Layout = (props) => {

    const user = JSON.parse(localStorage.getItem('user'));
    const [name, setName] = useState("");
    const location = useLocation();

    useEffect(() => {
        let name_split = localStorage.getItem("user");
        setName(name_split);
    },[]);

    function toggle() {
        let navigation = document.querySelector('.navigation');
        let main = document.querySelector('.main');
        navigation.classList.toggle("active");
        main.classList.toggle("active");
    }

    return (
        <div className="admin-layout">
            <div className="admin-layout-left">
                <div className="container1">
                    <div className="navigation" id="navigation">
                        <div className="d-flex justify-content-center py-3 w-100">
                            <img src="/image/logo.png" className="image w-50" alt="Error"/>
                        </div>
                        <ul>
                            <li className={location.pathname === `/chart/${localStorage.getItem('companyId')}` ? 'active' : ""}>
                                <Link to={`/chart/${localStorage.getItem('companyId')}`}
                                      className={`nav-link ${location.pathname === `/chart/${localStorage.getItem('companyId')}` ? 'active' : ""}`}>
                                    <span className="icon"><img src="/image/line-chart.png" width='25px' height='25px' alt="Error"/></span>
                                    <span className="title">Grafika</span>
                                </Link>
                            </li>
                            <li className={location.pathname === `/income/${localStorage.getItem('companyId')}` ? 'active' : ""}>
                                <Link to={`/income/${localStorage.getItem('companyId')}`}
                                      className={`nav-link ${location.pathname === `/income/${localStorage.getItem('companyId')}` ? 'active' : ""}`}>
                                    <span className="icon"><img src="/image/income.png" width='25px' height='25px' alt="Error"/></span>
                                    <span className="title">Kirim</span>
                                </Link>
                            </li>
                            <li className={location.pathname === `/expence/${localStorage.getItem('companyId')}` ? 'active' : ""}>
                                <Link to={`/expence/${localStorage.getItem('companyId')}`}
                                      className={`nav-link ${location.pathname === `/expence/${localStorage.getItem('companyId')}` ? 'active' : ""}`}>
                                    <span className="icon"><img src="/image/expenses.png" width='25px' height='25px' alt="Error"/></span>
                                    <span className="title">Chiqim</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="admin-layout-right">
                <div className="main">
                    <div className="topbar align-items-center">

                        <div className='d-flex mt-2'>
                            <h5>{localStorage.getItem('companyName')}</h5>
                            <h5 className='text-success ms-5'>+25 000 000</h5>
                            <h5 className='text-danger ms-5'>-15 000 000</h5>
                        </div>

                        <div className="user d-flex justify-content-between">
                            <div className="d-flex align-items-center justify-content-between">
                                <span className="mr-2"><FaRegUserCircle className="user-img mr-3"/></span>
                                <span style={{lineHeight: "18px"}}>{user.last_name} {' '} {user.first_name}</span>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 mt-4">
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Layout;