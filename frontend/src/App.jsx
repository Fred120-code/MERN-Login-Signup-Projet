
import './App.css'
import { Routes, Route, Navigate} from "react-router-dom"
import Index from './Pages/Index'
import Login from './Pages/Login';
import Signup from './Pages/Signup';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/" element={<Index/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
      </Routes>
    </>
  );
}

export default App
