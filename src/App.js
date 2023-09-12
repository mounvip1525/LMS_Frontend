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

const App = () => {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/user/home" element={<ApplyLoan />} />
          <Route path="/user/loan/apply" element={<ApplyLoan />} />
          <Route path="/user/loan/all" element={<ViewLoans />} />
          <Route path="/user/item/all" element={<ItemsPurchased />} />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/home" element={<AddCustomer />} />
          <Route path="/admin/customer/add" element={<AddCustomer />} />
          <Route path="/admin/customer/all" element={<CustomerData />} />
          <Route path="/admin/loan/add" element={<AddLoan />} />
          <Route path="/admin/loan/all" element={<LoanData />} />
          <Route path="/admin/item/add" element={<AddItem />} />
          <Route path="/admin/item/all" element={<ItemsMaster />} />

          <Route path="/" element={<UserLogin />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
