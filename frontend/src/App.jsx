import Navbar from "./components/Navbar"
import Manager from "./components/Manager"
import Login from "./components/Login"
import Landing from "./components/Landing"
import Register from "./components/Register"
import { BrowserRouter, Routes, Route,HashRouter } from 'react-router-dom';

function App() {
  return (
    <>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Manager/>} />
        </Routes>
      
    </>
  )
}

export default App
