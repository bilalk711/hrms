import { Route, Routes, Navigate } from "react-router";
import { BrowserRouter } from "react-router-dom";
import useAuth from './hooks/useAuth'; // assuming you have created this hook to handle Firebase Auth
import AddEmployee from "./components/containers/AddEmployee";
import Dashboard from "./components/containers/Dashboard";
import EditEmployee from "./components/containers/EditEmployee";
import Employees from "./components/containers/Employees";
import Leaves from "./components/containers/Leaves";
import Payrolls from "./components/containers/Payrolls";
import AddLeave from "./components/containers/AddLeave";
import AddPayroll from "./components/containers/AddPayroll";
import Layout from "./components/containers/Layout";
import Login from "./components/containers/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes> 
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<Layout/>}>
          <Route exact path="" element={<Dashboard/>}/>
          <Route exact path="employees" element={<Employees/>}/>
          <Route path="employees/add" element={<AddEmployee/>}/>
          <Route path="employees/edit/:id" element={<EditEmployee/>}/>
          <Route path="leaves" element={<Leaves/>}/>  
          <Route path="leaves/:id" element={<Leaves/>}/> 
          <Route path="leaves/:id/add-leave" element={<AddLeave/>}/>   
          <Route path="payrolls" element={<Payrolls/>}/>
          <Route path="payrolls/:id" element={<Payrolls/>}/>
          <Route path="payrolls/:id/add-payroll" element={<AddPayroll/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
