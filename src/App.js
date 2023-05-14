import 'bootstrap/dist/css/bootstrap.min.css';
import './sass/main.scss';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import Registr from "./pages/Registr";
import Charts from "./pages/Charts";
import Income from "./pages/Income";
import Expense from "./pages/Expence";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Login/>}/>
        <Route path={'/registr'} element={<Registr/>}/>
        <Route path={'/chart/:id'} element={<Charts/>}/>
        <Route path={'/income/:id'} element={<Income/>}/>
        <Route path={'/expence/:id'} element={<Expense/>}/>
        <Route path={'/home'} element={<Home/>}/>
        <Route path={'/profile'} element={<Profile/>}/>
      </Routes>
      <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"/>
    </BrowserRouter>
  );
}

export default App;
