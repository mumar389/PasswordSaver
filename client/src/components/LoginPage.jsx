import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here
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
    } else if (res.status === 200) {
    //   console.log("Error");
      const resp = await res.json();
      const { message } = resp;
      alert(message);
    //   navigate("/save-password");
    window.open('https://password-saver-umar.vercel.app/save-password','_self')
    } else {
      alert("Internal Server Error");
      navigate('/login')
    }
  };
  // const googleLogin = async (e) => {
  //   window.open("https://password-saver-umar.vercel.app/user/auth/google", "_self");
  // };
  const googleLogin = async (e) => {
    // window.open("http://localhost:7890/user/auth/google", "_self");
    /*
      headers: {
        "Content-Type": "application/json",
      },
    */
    const res = await fetch("https://password-saver-umar.vercel.app/user/auth/google", {
      method: "GET",
    });
    if (res.status === 200) {
      const resp = await res.json();
      console.log(resp);
    } else {
      alert("Error");
    }
    // if (res.status === 301 || res.status === 422) {
    //   console.log("Error");
    //   const resp = await res.json();
    //   const { message } = resp;
    //   alert(message);
    // } else if (res.status === 200) {
    // //   console.log("Error");
    //   const resp = await res.json();
    //   // const { message } = resp;
    //   // alert(message);
    //   console.log("Response aa gya",resp);
    //   setLoading(false)
    // //   navigate("/save-password");
    // window.open('http://localhost:3000/save-password','_self')
    // } else {
    //   alert("Internal Server Error");
    //   navigate('/login')
    // }
  };
  return (
    <div className="container">
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
      <br/>
      <button onClick={googleLogin}>Login using Google</button>
      <br/>
      <Link to="/register" style={{ color: "white", fontSize: "20px" }}>
        Not Yet Registered? click here to Register
      </Link>
    </div>
  );
};

export default LoginPage;
