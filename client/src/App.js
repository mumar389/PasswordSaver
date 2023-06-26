import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./components/LoginPage";
import SavePasswordPage from "./components/SavePasswordPage";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import Register from "./components/Register";
import Protected from "./components/Protected";
import GetPassword from "./components/GetPassword";
import ErrorPage from "./components/ErrorPage";
import GeneratePassword from "./components/GeneratePassword";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/save-password-page" element={<Protected Component={SavePasswordPage} />} />
        <Route path="/get-password-page" element={<Protected Component={GetPassword} />} />
        <Route path="/generate-password-page" element={<Protected Component={GeneratePassword} />} />
        <Route path="*" element={<ErrorPage/>} />
      </Routes>
    </>
  );
}

export default App;
