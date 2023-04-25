import React from 'react';
import {useFormik} from "formik";
import {useNavigate} from 'react-router-dom'
import {useDispatch} from "react-redux";
import {postRegistgr} from "../redux/reducer/registrReducer";
import {history} from "../redux/const";

const Registr = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    history.navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
        },
        validate: values => {
            const error = {};
            Object.keys(values).forEach(key => {
                if (!values[key]) {
                    error[key] = 'required';
                }
            });
            return error;
        },
        onSubmit: values => {
            dispatch(postRegistgr({values}))
        },
    });

    return (
        <div className='login'>
            <div className="row">
                <div className='col-5 vh-100 bg-green d-flex align-items-center justify-content-center'>
                    <img src="./image/loginImage.svg" alt="Error" className='w-100'/>
                </div>
                <div className='col-7 vh-100 d-flex align-items-center justify-content-center'>
                    <div className='w-75'>
                        <h2 className="text-center fw-bolder">Registr Page</h2>
                        <form onSubmit={formik.handleSubmit} className='px-5 rounded-3'>
                            <label htmlFor="firstName">Name</label>
                            <input
                                name="first_name"
                                id="first_name"
                                onChange={formik.handleChange}
                                value={formik.values.firstName}
                                type="text"
                                className='form-control mt-2 mb-3'
                                placeholder='John'
                            />
                            <label htmlFor="lastName">Surname</label>
                            <input
                                name="last_name"
                                id="last_name"
                                onChange={formik.handleChange}
                                value={formik.values.lastName}
                                type="text"
                                className='form-control mt-2 mb-3'
                                placeholder="Doe"
                            />
                            <label htmlFor="email">Email</label>
                            <input
                                name="email"
                                id="email"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                type="email"
                                className='form-control mt-2 mb-3'
                                placeholder='johndoe@gmail.com'
                            />
                            <label htmlFor="password">Password</label>
                            <input
                                required
                                id="password"
                                name="password"
                                type="password"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                className='form-control mb-3 mt-2'
                                placeholder="Enter a password"
                            />
                            <button
                                type="submit"
                                className='btn btn-success w-100 mt-3'
                            >
                                Kirish
                            </button>
                            <p className="mb-0 mt-4 text-center">Akkauntingiz bormi?</p>
                            <div className="text-center">
                                <a
                                    className='mb-0 w-100'
                                    onClick={() => navigate('/')}
                                    style={{cursor: "pointer", color: "#41AE8D"}}
                                >
                                    Kirish
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registr;