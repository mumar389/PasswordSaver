import React, { useEffect } from "react";
import Footer from "./Footer";

const HomePage = () => {
  useEffect(() => {
    const clearCookiesOnUnload = () => {
      // Clear your cookies here
      document.cookie = 'cookieName=jwt; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      localStorage.removeItem('jwt')
    };

    window.addEventListener('beforeunload', clearCookiesOnUnload);

    return () => {
      window.removeEventListener('beforeunload', clearCookiesOnUnload);
    };
  }, []);
  return (
    <>
      <div className="container">
        <div className="jumbotron my-color">
          <h1 className="display-4">Welcome to Password Saver</h1>
          <p className="lead">Never forget your passwords again!</p>
        </div>
        <div className="row">
        <div className="col-md-6">
          <h2>Features</h2>
          <ul>
            <li>Securely store your passwords</li>
            <li>Easy access to your saved passwords</li>
            <li>Add, edit, and delete passwords</li>
            <li>Organize passwords with titles and links</li>
            <li>Generate Passwords of the size of your choice</li>
          </ul>
        </div>
        <div className="col-md-6">
          <h2>About</h2>
          <p>No need to use copy pen for writing your passwords.</p>
          <p>We try to Keep Your passwords safe and secure.</p>
        </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
