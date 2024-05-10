import { Route, Routes } from "react-router-dom";
import Home from "./components/Home"; import Sidebar from "./components/Sidebar";
import "./App.css";
import ListCustomers from "./containers/ListCustomers";
import ManageCustomer from "./containers/ManageCustomers";

function App() { 


  return (
    <div>
      <Sidebar />
      <div className="content-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/view" element={<ManageCustomer />} /> 
          <Route path="/view/:id" element={<ManageCustomer />} /> 
          <Route path="/customers" element={<ListCustomers />} />
        </Routes> 
      </div>
    </div>
    ); }
export default App;
