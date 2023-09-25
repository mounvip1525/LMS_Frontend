import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserLogin from "./components/User/Login";
import AdminLogin from "./components/Admin/Login";
import AddCustomer from "./components/Admin/Customer/AddCustomer";
import CustomerData from "./components/Admin/Customer/CustomerData";
import AddLoan from "./components/Admin/Loan/AddLoan";
import LoanData from "./components/Admin/Loan/LoanData";
import AddItem from "./components/Admin/Item/AddItem";
import ItemsMaster from "./components/Admin/Item/ItemsMaster";
import ApplyLoan from "./components/User/ApplyLoan";
import ViewLoans from "./components/User/ViewLoans";
import ItemsPurchased from "./components/User/ItemsPurchased";
import { useAuth } from "./context/AuthContext";
import About from "./components/About";

const App = () => {
  const { user } = useAuth();
  return (
    <div className="app">
      <Router>
        <Routes>
          {/* (user && user.role === "Admin") ? <LoanData /> : <AdminLogin />  */}
          <Route path="/user/login" element={(user && user.role === "User") ? <ApplyLoan/> : <UserLogin />} />
          <Route path="/user/home" element={(user && user.role === "User") ? <ApplyLoan/> : <UserLogin />} />
          <Route path="/user/loan/apply" element={(user && user.role === "User") ? <ApplyLoan/> : <UserLogin />} />
          <Route path="/user/loan/all" element={(user && user.role === "User") ? <ViewLoans /> : <UserLogin />} />
          <Route path="/user/item/all" element={(user && user.role === "User") ? <ItemsPurchased /> : <UserLogin />} />

          <Route path="/admin/login" element={(user && user.role === "Admin") ? <AddCustomer /> : <AdminLogin />} />
          <Route path="/admin/home" element={(user && user.role === "Admin") ? <AddCustomer /> : <AdminLogin />} />
          <Route path="/admin/customer/add" element={(user && user.role === "Admin") ? <AddCustomer /> : <AdminLogin />} />
          <Route path="/admin/customer/all" element={(user && user.role === "Admin") ? <CustomerData /> : <AdminLogin />} />
          <Route path="/admin/loan/add" element={(user && user.role === "Admin") ? <AddLoan /> : <AdminLogin />} />
          <Route path="/admin/loan/all" element={(user && user.role === "Admin") ? <LoanData /> : <AdminLogin />} />
          <Route path="/admin/item/add" element={(user && user.role === "Admin") ? <AddItem /> : <AdminLogin />} />
          <Route path="/admin/item/all" element={(user && user.role === "Admin") ? <ItemsMaster /> : <AdminLogin />} />

          <Route path="/about" element={<About />} />
          <Route path="/" element={(user && user.role === "User") ? <ApplyLoan/> : <About />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
