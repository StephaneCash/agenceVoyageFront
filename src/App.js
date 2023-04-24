import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from "./components/home/Home"
import Navbar from './components/navbar/Navbar';
import Admin from './components/admin/Admin';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Add from './components/admin/Add';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/vols/add" element={<Add />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
