import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import {BsTelegram, BsYoutube, BsFacebook} from "react-icons/bs"
import {FiLogOut} from 'react-icons/fi'
import {BsFillPersonLinesFill} from "react-icons/bs";
import {CgArrowBottomRightO} from "react-icons/cg";
import {Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import {useNavigate} from 'react-router-dom';
import {useFormik} from "formik";
import axios from "axios";
import {API} from "../redux/const";
import {useDispatch, useSelector} from "react-redux";
import {addCompany, getCompany} from "../redux/reducer/companyReducer";
import {openCompanyModal, closeCompanyModal} from "../redux/reducer/companyReducer";

const Home = () => {

    const [modal, setModal] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    // const [addCompanyModal, setAddCompanyModal] = useState(false);
    const [category, setCategory] = useState([]);
    const [type, setType] = useState([]);
    const [allType, setAllType] = useState([]);
    const isOpen = useSelector((store => store.companyReducer.isOpen));
    const allCompany = useSelector((store => store.companyReducer.company));
    console.log(allCompany);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getCompany());

        axios.get(API + "api/categories/")
            .then((res) => {
                console.log(res?.data);
                setCategory(res?.data)
            })
            .catch(err => console.log(err));
        axios.get(API + "api/types/")
            .then((res) => {
                console.log(res?.data);
                setAllType(res?.data)
            })
            .catch(err => console.log(err))
    }, [isOpen]);

    const ChooseType = (id) => {
        axios.get(API + "api/types/?category_id=" + id)
            .then((res) => {
                console.log(res?.data);
                setType(res?.data)
            })
            .catch(err => console.log(err))
    };
    const date = new Date();
    let currentDay = String(date.getDate()).padStart(2, '0');
    let currentMonth = String(date.getMonth() + 1).padStart(2, "0");
    let currentYear = date.getFullYear();
    let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
    const user = JSON.parse(localStorage.getItem('user'));
    const manager_id = user?.id;

    const formik = useFormik({
        initialValues: {
            name: "",
            created_date: currentDate,
            employees: "",
            manager: manager_id,
            category: "",
            type: ""
        },
        onSubmit: values => {
            const array = [];
            array.push(Number(values.type));
            const data = {
                name: values.name,
                created_date: values.created_date,
                employees: values.employees,
                manager: values.manager,
                category: JSON.parse(values.category),
                type: array
            };
            dispatch(addCompany({data}))
        }
    });

    return (
        <>
            <div className="bg-green">
                <div className="container">
                    <div className="navbar">
                        <Link to={'/'} className="navbar-brand text-success">
                            IMAGE
                        </Link>

                        <ul className='nav '>
                            <li className='nav-item'><Link to={'/'} className='nav-link ms-5 text-success'>Chart</Link>
                            </li>
                            <li className='nav-item'><Link to={'/'} className='nav-link ms-5 text-success'>Chart</Link>
                            </li>
                            <li className='nav-item'><Link to={'/'} className='nav-link ms-5 text-success'>Chart</Link>
                            </li>
                            <li className='nav-item'><Link to={'/'} className='nav-link ms-5 text-success'>Chart</Link>
                            </li>
                            <li className='nav-item position-relative dblock'>
                                <Link className='nav-link ms-5 text-success' onClick={() => setModal(!modal)}>
                                    <b>
                                        {user.last_name} {' '} {user.first_name} <CgArrowBottomRightO/>
                                    </b>
                                </Link>
                                <div
                                    className={`position-absolute bg-green px-4 py-2 text-start dnone`}
                                    style={{top: '30px', right: "10px"}}>
                                    <Link to={'/profile'} className='mb-2 text-decoration-none text-dark'
                                          style={{cursor: "pointer"}}>
                                        <BsFillPersonLinesFill className='text-secondary me-1'/>Profile
                                    </Link>
                                    <p className='mb-0' style={{cursor: "pointer"}} onClick={() => setOpenModal(true)}>
                                        <FiLogOut className='text-danger'/> Log out
                                    </p>
                                </div>
                            </li>
                        </ul>
                        <Modal isOpen={openModal} toggle={() => setOpenModal(false)} className=''>
                            <ModalHeader toggle={() => setOpenModal(!openModal)}> </ModalHeader>
                            <ModalBody>
                                Rostdan xam akkaunntdan chiqmoqchimisiz ???
                            </ModalBody>
                            <ModalFooter className='d-flex justify-content-between'>
                                <button className='btn btn-success' onClick={() => setOpenModal(false)}>Yo'q</button>
                                {' '}
                                <button className='btn btn-danger' onClick={() => navigate('/')}>Ha</button>
                            </ModalFooter>
                        </Modal>
                    </div>
                </div>
            </div>

            <div className='container my-5'>
                <div className="row">
                    <div className="col-12 w-100 d-flex mb-4 justify-content-end">
                        <button className="btn btn-success" onClick={() => dispatch(openCompanyModal())}>Add Company
                        </button>
                    </div>
                    {allCompany?.map((item, index) => {
                        return (
                            <Link
                                to={`/chart/${item.id}`} key={index}
                                className="col-4 text-decoration-none text-dark my-3"
                                onClick={() => {
                                    console.log(item.id);
                                    localStorage.setItem('companyId', item.id);
                                    localStorage.setItem('companyName', item.name);
                                }}
                            >
                                <div className="card">
                                    {/*<div className="card-body p-0">*/}
                                    {/*    <img src="./image/startup.jpg" className='w-100' style={{objectFit: "cover"}}*/}
                                    {/*         alt="Error"/>*/}
                                    {/*</div>*/}
                                    <div className="card-footer">
                                        <h3 className="my-2 text-center">{item.name}</h3>
                                        <h6>Employer: {item.employees}</h6>
                                        <h6>Category: {category?.filter(itemCategory => itemCategory.id === item.category)
                                            .map(element => {
                                                console.log(element.id, element.business_category)
                                                return (<span>{element.business_category}</span>)
                                            })}</h6>
                                        <h6>Type: {allType?.filter(itemType => itemType.id === item?.type[0])
                                            .map(element => {
                                                // console.log(element.id, element.business_type)
                                                return (<span>{element.business_type}</span>)
                                            })}</h6>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>

                {/*                  Add company modal                   */}

                <form onSubmit={formik.handleSubmit}>
                    <Modal isOpen={isOpen} toggle={() => dispatch(closeCompanyModal())} size="lg">
                        <ModalHeader toggle={() => dispatch(closeCompanyModal())}> </ModalHeader>
                        <ModalBody>
                            <div className="row">
                                <div className="col-6">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        id="name"
                                        className="form-control mb-3"
                                        type="text"
                                        name="name"
                                        required={true}
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                    />
                                    <label htmlFor="created_date">Created date</label>
                                    <input
                                        id="created_date"
                                        className="form-control mb-3"
                                        type="date"
                                        name="created_date"
                                        value={formik.values.created_date}
                                        onChange={formik.handleChange}
                                    />
                                    <label htmlFor="employees">Employees</label>
                                    <input
                                        id="employees"
                                        className="form-control mb-3"
                                        type="number"
                                        name="employees"
                                        required
                                        value={formik.values.employees}
                                        onChange={formik.handleChange}
                                    />
                                </div>

                                <div className="col-6">
                                    <label htmlFor="category">Category</label>
                                    <select
                                        id="category"
                                        className="form-control mb-3"
                                        name="category"
                                        value={formik.values.category}
                                        onChange={(e) => {
                                            formik.handleChange(e);
                                            ChooseType(e.target.value);
                                        }}
                                    >
                                        <option disabled={false} defaultValue className="disabled">Choose category
                                        </option>
                                        {
                                            category.map((item, index) => {
                                                return (
                                                    <option key={index}
                                                            value={item.id}>{item.business_category}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <label htmlFor="type">Type</label>
                                    <select
                                        id="type"
                                        required={true}
                                        name="type"
                                        value={formik.values.type}
                                        className="form-control"
                                        onChange={formik.handleChange}
                                    >
                                        <option disabled={false} defaultValue className="disabled">Choose type</option>
                                        {
                                            type.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.id}>{item.business_type}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <div className="d-flex justify-content-end mt-4 pt-3">
                                        <button className='btn btn-success mx-5' type="submit"
                                                onClick={formik.handleSubmit}>Add
                                        </button>
                                        {' '}
                                        <button className='btn btn-danger' onClick={() => closeCompanyModal()}>Cancel</button>
                                    </div>

                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter className='d-flex justify-content-end'>

                        </ModalFooter>
                    </Modal>
                </form>

            </div>

            <div className="bg-green  mt-5">
                <footer className="mainfooter" role="contentinfo">
                    <div className="footer-middle">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-3 col-sm-6">
                                    <div className="footer-pad">
                                        <h4> Footer Heading 1</h4>
                                        <ul className="list-unstyled">
                                            <li><a href="#"> </a></li>
                                            <li><a href="#">Payment Center</a></li>
                                            <li><a href="#"> Contact Directory </a></li>
                                            <li><a href="#">Forms</a></li>
                                            <li><a href="#">News and Updates</a></li>
                                            <li><a href="#">FAQs</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-3 col-sm-6">
                                    <div className="footer-pad">
                                        <h4> Footer Heading 2</h4>
                                        <ul className="list-unstyled">
                                            <li><a href="#"> Blog </a></li>
                                            <li><a href="#">Accessibility</a></li>
                                            <li><a href="#">Disclaimer</a></li>
                                            <li><a href="#">Privacy Policy</a></li>
                                            <li><a href="#">FAQs</a></li>
                                            <li><a href="#">Webmaster</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-3 col-sm-6">
                                    <div className="footer-pad">
                                        <h4> Footer Heading 3 </h4>
                                        <ul className="list-unstyled">
                                            <li><a href="#"> Parks and Recreation </a></li>
                                            <li><a href="#"> Public Works </a></li>
                                            <li><a href="#">Police Department</a></li>
                                            <li><a href="#"> Fire </a></li>
                                            <li><a href="#"> Mayor and City Council </a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <h4> Follow Us </h4>
                                    <ul className="social-network social-circle">
                                        <li><BsTelegram/></li>
                                        <li><BsFacebook/></li>
                                        <li><BsYoutube/></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 copy">
                                    <p className="text-center"> © Copyright 2021 - Company Name. All rights
                                        reserved. </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default Home;