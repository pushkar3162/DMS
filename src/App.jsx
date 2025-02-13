import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthForm from "./components/AuthForm";
import "./components/styles.css";
import Dashboard from "./Dashboard";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/" element={<AuthForm />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
