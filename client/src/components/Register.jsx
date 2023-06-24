import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cp, setCp] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here
    const res = await fetch("/user/create-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        cp,
      }),
    });
    if (res.status === 301 || res.status === 422) {
      console.log("Error");
      const resp = await res.json();
      const { message } = resp;
      alert(message);
    } else if (res.status === 200) {
      console.log("Error");
      const resp = await res.json();
      const { message } = resp;
      alert(message);
      navigate("/login");
    } else {
      alert("Internal Server Error");
    }
  };

  return (
    <div className="container">
      <h2>Register Page</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 w-50">
          <label className="form-label">Name:</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
        <div className="mb-3 w-50">
          <label className="form-label">Confirm Password:</label>
          <input
            type="password"
            className="form-control"
            value={cp}
            onChange={(e) => setCp(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
      <Link to="/login" style={{ color: "white", fontSize: "20px" }}>
        Already Registered? click here to login
      </Link>
    </div>
  );
};

export default Register;
