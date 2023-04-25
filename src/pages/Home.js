import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import {BsTelegram, BsYoutube, BsFacebook} from "react-icons/bs"
import {FiLogOut} from 'react-icons/fi'
import {BsFillPersonLinesFill} from "react-icons/bs";
import {CgArrowBottomRightO} from "react-icons/cg";
import {Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import {useNavigate} from 'react-router-dom';

const Home = () => {

    const [modal, setModal] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();
    const company = [
        {image: "./image/startup.jpg", name: "Company 1"},
        {image: "./image/startup.jpg", name: "Company 2"},
        {image: "./image/startup.jpg", name: "Company 3"},
        {image: "./image/startup.jpg", name: "Company 4"},
        {image: "./image/startup.jpg", name: "Company 5"},
        {image: "./image/startup.jpg", name: "Company 6"}
    ];

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
                                        Xolmuminov Umidjon <CgArrowBottomRightO/>
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
                    {company.map((item, index) => {
                        return (
                            <div key={index} className="col-4 my-3">
                                <div className="card">
                                    <div className="card-body p-0">
                                        <img src={item.image} className='w-100' style={{objectFit: "cover"}}
                                             alt="Error"/>
                                    </div>
                                    <div className="card-footer">
                                        <h3 className="my-2">{item.name}</h3>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
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