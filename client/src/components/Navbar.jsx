import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [cookie] = useCookies();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const navigate = useNavigate();
  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = async (e) => {
    // sign-out
    const res = await fetch("/user/sign-out", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 301 || res.status === 422) {
      console.log("Error");
      const resp = await res.json();
      const { message } = resp;
      alert(message);
      navigate("/save-password");
    } else if (res.status === 200) {
      const resp = await res.json();
      const { message } = resp;
      alert(message);
      //   navigate("/");
      window.open("https://password-saver-umar.vercel.app/", "_self");
    } else {
      alert("Internal Server Error");
      navigate("/save-password");
    }
  };
  //navbar-dark bg-dark
  return (
    <nav className="navbar navbar-expand-lg  navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Password Saver
        </Link>
        <button className="navbar-toggler" type="button" onClick={handleToggle}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${isCollapsed ? "" : "show"}`}
        >
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            {cookie.jwt ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/save-password">
                    Save-Password
                  </Link>
                </li>
                <li className="nav-item">
                  <p
                    className="nav-link"
                    style={{ cursor: "pointer" }}
                    onClick={handleLogout}
                  >
                    Logout
                  </p>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
