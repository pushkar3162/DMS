import "./components/styles.css";
import Dashboard from "./components/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthForm from "./components/AuthForm";
export default function App() {
  console.log("testing purpose....");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/" element={<AuthForm />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
