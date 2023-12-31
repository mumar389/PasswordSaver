import React, { useEffect, useState } from "react";
// import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import base from "../url";
const Navbar = () => {
  // const [cookie] = useCookies();
  const [loggedin,setLogin]=useState(false);
  const [loading, setloading] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const navigate = useNavigate();
  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };
  const handleLogout = async (e) => {
    // sign-out
    setloading(true);
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
      setloading(false);
      navigate("/save-password-page");
    } else if (res.status === 200) {
      const resp = await res.json();
      const { message } = resp;
      localStorage.removeItem("jwt");
      setLogin(true)
      console.log(message);
      window.open(`${base}/`, "_self");
      setloading(false);
    } else {
      setloading(false);
      alert("Internal Server Error");
      navigate("/save-password-page");
    }
  };
  useEffect(()=>{
    if(localStorage.getItem("jwt")){
      setLogin(true)
    }else{
      setLogin(false)
    }
  },[])
  return (
    <>
      <nav className="navbar navbar-expand-lg  navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Password Saver
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            onClick={handleToggle}
          >
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
              {loggedin ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/save-password-page">
                      Save-Password
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/get-password-page">
                      All-Passwords
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/generate-password-page">
                      Generate-Password
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
      <div className="container">{loading && <Loading />}</div>
    </>
  );
};

export default Navbar;
