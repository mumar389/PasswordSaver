import React, { useState } from "react";
import Loading from "./Loading";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Footer from "./Footer";
const SavePasswordPage = () => {
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle saving password logic here
    setLoading(true);
    const jwToken = localStorage.getItem("jwt");
    const res = await fetch("/user/save-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwToken}`,
      },
      body: JSON.stringify({
        title,
        passkey: password,
        link,
      }),
    });
    if (res.status === 422 || res.status === 301 || res.status === 500) {
      const resp = await res.json();
      const { message } = resp;
      setLoading(false);
      alert(message);
    } else if (res.status === 200) {
      const resp = await res.json();
      const { message } = resp;
      setLoading(false);
      alert(message);
      setTitle("");
      setPassword("");
      setLink("");
    }
  };

  return (
    <>

    <div className="container">
      {loading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <h2>Secure You Passwords-:</h2>
          <form>
            <div className="mb-3 w-50">
              <label className="form-label">Title:</label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-3  w-50">
              <label className="form-label">Password:</label>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <p
                className="password-toggle-button"
                onClick={handleTogglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </p>
            </div>
            <div className="mb-3 w-50">
              <label className="form-label">Link:</label>
              <input
                type="text"
                className="form-control"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                required
              />
            </div>
            <button
              onClick={handleSubmit}
              type="submit"
              className="btn btn-primary"
            >
              Save Password
            </button>
          </form>
        </>
      )}
    </div>
    <Footer/>
    </>

  );
};

export default SavePasswordPage;
