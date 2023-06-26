import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Loading from "./Loading";
import base from "../url";
const Register = () => {
  // const navigate = useNavigate();
  const [name, setName] = useState("");
  const[loading,setloading]=useState(false)
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
      setloading(false)
      alert(message);
    } else if (res.status === 200) {
      const resp = await res.json();
      const { data } = resp;
      localStorage.setItem("jwt", data);
      setloading(false);
      window.open(`${base}/save-password-page`, "_self");
    } else {
      setloading(false)
      alert("Internal Server Error");
    }
  };

  return (
    <>
    {
      loading?<>
      <Loading/>
      </>
      :
      <>
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
      </>
    }
     
      <Footer />
    </>
  );
};

export default Register;
