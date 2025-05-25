import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import './App.css'
import UsersPage from "./pages/UsersPage";

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={< UsersPage/>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  </BrowserRouter>
);