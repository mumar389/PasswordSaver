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
            <h2>About</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
              euismod ligula id ex auctor tempus. Aliquam mollis libero ac elit
              efficitur, eget molestie sapien tristique.
            </p>
          </div>
          <div className="col-md-6">
            <h2>Features</h2>
            <ul>
              <li>Securely store your passwords</li>
              <li>Easy access to your saved passwords</li>
              <li>Add, edit, and delete passwords</li>
              <li>Organize passwords with titles and links</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
