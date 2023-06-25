import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import base from "../url";
import Footer from "./Footer";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here
    setLoading(true);
    const res = await fetch("/user/create-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (res.status === 301 || res.status === 422) {
      console.log("Error");
      const resp = await res.json();
      const { message } = resp;
      alert(message);
      setLoading(false);
    } else if (res.status === 200) {
      const resp = await res.json();
      const { data } = resp;
      localStorage.setItem("jwt", data);
      setLoading(false);
      window.open(
        `${base}/save-password`,
        "_self"
      );
    } else {
      alert("Internal Server Error");
      setLoading(false);
      navigate("/login");
    }
  };
  const googleLogin = async (e) => {
    try {
      window.open(
        `${base}/user/auth/google`,
        "_self"
      );
    } catch (error) {
      console.log("Google login failed:", error);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      navigate("/save-password");
    } else {
    }
    // eslint-disable-next-line
  }, []);
  return (
    <>

    <div className="container">
      {loading && <Loading />}
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 w-50">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3 w-50">
          <label className="form-label">Password:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      <br />
      <button onClick={googleLogin}>Login using Google</button>
      <br />
      <Link to="/register" style={{ color: "white", fontSize: "20px" }}>
        Not Yet Registered? click here to Register
      </Link>
    </div>
    <Footer/>
    </>
  );
};

export default LoginPage;
