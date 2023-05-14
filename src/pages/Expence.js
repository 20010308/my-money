import React, {useEffect, useState} from 'react';
import Layout from "../component/Layout";
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {
    addExpence,
    getExpense,
    closeExpenseModal,
    openExpenseModal,
    openUrlModal,
    closeUrlModal,
    downloadUrl,
    closeDownloadModal
} from "../redux/reducer/expenseReducer";
import {useDispatch, useSelector} from "react-redux";

const Expense = (props) => {


    const dispatch = useDispatch();
    const [status, setStatus] = useState(false);
    const isOpen = useSelector(state => state.expenseReducer.isOpen);
    const expense = useSelector(state => state.expenseReducer.expense);
    const urlModal = useSelector(state => state.expenseReducer.urlModal);
    const url = useSelector(state => state.expenseReducer.url);
    const download = useSelector(state => state.expenseReducer.download);
    const date = new Date();
    let currentDay = String(date.getDate()).padStart(2, '0');
    let currentMonth = String(date.getMonth() + 1).padStart(2, "0");
    let currentYear = date.getFullYear();
    let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
    let [newExpense, setNewExpense] = useState({
        from_what: "",
        cost: null,
        // date: currentDate,
        auto: false,
        often: "30",
        status: "",
        company: JSON.parse(localStorage.getItem('companyId'))
    });

    const onSubmitHandler = () => {
        console.log(newExpense);
        if (newExpense.auto) {
            dispatch(addExpence({data: newExpense}))
        } else {
            delete newExpense.often;
            delete newExpense.status;
            dispatch(addExpence({data: newExpense}))

        }
    };

    let [document, setDoceument] = useState({
        begin: currentDate,
        end: currentDate,
        company: localStorage.getItem('companyId')
    });

    const getDocument = () => {
        // console.log(document);
        dispatch(downloadUrl({data: document}))
    };

    useEffect(() => {
        dispatch(getExpense());
    }, [isOpen]);


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

                {expense.map((item, index) => {
                    return (
                        <tr key={index}>
                            <td>{item?.date}</td>
                            <td>{item?.cost}</td>
                            <td>{item?.from_what}</td>
                            <td>{item?.auto ? 'true' : 'false'}</td>
                        </tr>
                    )
                })}

                </tbody>
            </table>
            <div className='position-fixed d-flex w-75 justify-content-end pb-4' style={{bottom: '0', right: "30px"}}>
                <button className='btn btn-danger' onClick={() => dispatch(openExpenseModal())}>Qo'shish</button>
                <button className='btn btn-success ms-5' onClick={() => dispatch(openUrlModal())}>Xisobot</button>
            </div>

            <form>
                <Modal isOpen={isOpen} toggle={() => dispatch(closeExpenseModal())} size="md">
                    <ModalHeader toggle={() => dispatch(closeExpenseModal())}> </ModalHeader>
                    <ModalBody>
                        <div className="row">
                            <div className="col-12">
                                <label htmlFor="from_what">Why ?</label>
                                <input
                                    id="from_what"
                                    className="form-control mb-3"
                                    type="text"
                                    name="from_what"
                                    value={newExpense.from_what}
                                    onChange={(e) => setNewExpense({...newExpense, from_what: e.target.value})}
                                />
                                <label htmlFor="cost">Cost</label>
                                <input
                                    id="cost"
                                    className="form-control mb-3"
                                    type="number"
                                    name="cost"
                                    value={newExpense.cost}
                                    onChange={(e) => setNewExpense({...newExpense, cost: Number(e.target.value)})}
                                />
                                <input
                                    // style={{marginTop: "35px"}}
                                    id="auto"
                                    className="me-3 mt-3"
                                    type="checkbox"
                                    name="auto"
                                    value={newExpense.auto}
                                    onChange={(e) => {
                                        // formik.handleChange(e);
                                        // e.target.checked ? setStatusName('Added') : '';
                                        setStatus(e.target.checked);

                                        if (e.target.checked) {
                                            // setStatusName('Added');
                                            setNewExpense({...newExpense, auto: e.target.checked, status: "Added"})
                                        } else {
                                            // setStatusName('');
                                            setNewExpense({...newExpense, auto: e.target.checked, status: ""})
                                        }
                                        // console.log(e.target.checked)
                                    }}
                                />
                                <label htmlFor="employees">Auto</label>
                            {/*</div>*/}
                            {status ?
                                <div>
                                    <label htmlFor="often" className='mt-3'>To'lovning takrorlanishi</label>
                                    <select
                                        id="often"
                                        className="form-control mb-3"
                                        name="often"
                                        value={newExpense.often}
                                        onChange={(e) => setNewExpense({...newExpense, often: e.target.value})}
                                    >
                                        {/*<option disabled={false} defaultValue className="disabled">Choose category</option>*/}
                                        <option value="7" defaultValue>1 week</option>
                                        <option value="30">1 monyh</option>
                                    </select>
                                </div> : ""}
                            <div className="d-flex justify-content-end mt-4 pt-3">
                                <button className='btn btn-success mx-5' type="submit" onClick={onSubmitHandler}>
                                    Add
                                </button>
                                {' '}
                                <button className='btn btn-danger'
                                        onClick={() => dispatch(closeExpenseModal())}>Cancel
                                </button>
                            </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter className='d-flex justify-content-end'>

                    </ModalFooter>
                </Modal>
            </form>

            <Modal isOpen={urlModal} toggle={() => dispatch(closeUrlModal())} className=''>
                <ModalHeader toggle={() => dispatch(closeUrlModal())}> </ModalHeader>
                <ModalBody>
                    <label htmlFor="begin">Begin date</label>
                    <input
                        id="begin"
                        className="form-control mb-3"
                        type="date"
                        name="begin"
                        value={document.begin}
                        onChange={(e) => setDoceument({...document, begin: e.target.value})}
                    />
                    <label htmlFor="end">End date</label>
                    <input
                        id="end"
                        className="form-control mb-3"
                        type="date"
                        name="end"
                        value={document.end}
                        onChange={(e) => setDoceument({...document, end: e.target.value})}
                    />
                </ModalBody>
                <ModalFooter className='d-flex justify-content-between'>
                    <button className='btn btn-success' onClick={getDocument}>Download</button>
                    {' '}
                    <button className='btn btn-danger' onClick={() => dispatch(closeUrlModal())}>Cancel</button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={download} toggle={() => dispatch(closeDownloadModal())} className=''>
                <ModalHeader toggle={() => dispatch(closeDownloadModal())}> </ModalHeader>
                <ModalBody className='d-flex justify-content-center'>
                    <a href={url} className='btn text-decoration-none btn-success'>Download</a>
                </ModalBody>
            </Modal>

        </Layout>
    );
};

export default Expense;