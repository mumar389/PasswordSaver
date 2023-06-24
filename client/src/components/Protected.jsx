import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";

const Protected = (props) => {
    const [cookie]=useCookies();
    const {Component}=props
    const navigate=useNavigate()
    const verifyUser=async()=>{
        const res = await fetch("/user/verify-user", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization":`Bearer ${cookie.jwt}`
            },
         
          });
          if (res.status === 301 || res.status === 422) {
            console.log("Error");
            const resp = await res.json();
            const { message } = resp;
            alert(message);
            navigate("/login");
          } else if (res.status === 200) {
            console.log("Error");
            const resp = await res.json();
            const { message } = resp;
            console.log(message);
            // alert(message);
            // navigate("/save-password");
          } else {
            // alert("Internal Server Error");
            navigate("/login");
          }
    }
    useEffect(()=>{
        verifyUser()
    // eslint-disable-next-line
    },[])
  return (
    <Component/>
  )
}

export default Protected