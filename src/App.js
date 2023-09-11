import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserLogin from './components/User/Login';
import AdminLogin from './components/Admin/Login';
import UserHome from './components/User/Home';
import AdminHome from './components/Admin/Home';

const App = () => {
  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route path="/userLogin" element={<UserLogin />} />
          <Route path="/userHome" element={<UserHome />} />

          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/adminHome" element={<AdminHome />} />

          <Route path="/" element={<UserLogin />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
