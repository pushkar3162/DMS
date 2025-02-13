import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthForm from "./components/AuthForm";
import "./components/styles.css";
import Dashboard from "./Dashboard";
import Navbar from "./components/Navbar";
import RoleBasedUI from "./components/RoleBasedUI";
import { useState } from "react";
export default function App() {
  const [users, setUsers] = useState([]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/" element={<AuthForm />}></Route>
        <Route path="/RoleBasedUI" element={<RoleBasedUI users={users} setUsers={setUsers} />} />
      </Routes>
    </BrowserRouter>
  );
}
