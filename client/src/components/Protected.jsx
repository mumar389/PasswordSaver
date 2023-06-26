import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Protected = (props) => {
  const [cookie] = useCookies();
  if (cookie.google === "pwdsaver") {
    if (!localStorage.getItem("jwt")) localStorage.setItem("jwt", cookie.jwt);
  }
  const { Component } = props;
  const navigate = useNavigate();
  const verifyUser = async () => {
    const res = await fetch("/user/verify-user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    if (res.status === 301 || res.status === 422) {
      console.log("Error");
      const resp = await res.json();
      const { message } = resp;
      alert(message);
      navigate("/login");
    } else if (res.status === 200) {
      
    } else {
      // alert("Internal Server Error");
      navigate("/login");
    }
  };
  useEffect(() => {
    if (localStorage.getItem("jwt") || cookie.google === "pwdsaver")
      verifyUser();
    else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);
  return <Component />;
};

export default Protected;
