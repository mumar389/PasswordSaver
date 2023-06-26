import React, { useEffect, useState } from "react";
import { FaEye, FaEdit, FaTrash, FaEyeSlash, FaSave } from "react-icons/fa";
import Loading from "./Loading";

const GetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [update, setUpdated] = useState("");
  const [passwords, setPasswords] = useState([]);
  const jwToken = localStorage.getItem("jwt");
  const fetchPassword = async () => {
    const res = await fetch("/user/get-password", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwToken}`,
      },
    });
    if (res.status === 301 || res.status === 500) {
      const resp = await res.json();
      const { message } = resp;
      alert(message);
    } else if (res.status === 200) {
      const resp = await res.json();
      const { data } = resp;
      setPasswords(data);
      setLoading(false);
    }
  };

  const handleTogglePassword = (id) => {
    const updatedPasswords = passwords.map((password) => {
      if (password._id === id) {
        return { ...password, showPassword: !password.showPassword };
      }
      return password;
    });
    setPasswords(updatedPasswords);
  };

  const handleEditPassword = async (id) => {
    const updatedPasswords = passwords.map((password) => {
      if (password._id === id) {
        setUpdated(password.passkey);
        return { ...password, isEditing: true };
      }
      return password;
    });
    setPasswords(updatedPasswords);
  };

  const handleDeletePassword = async (id) => {
    // Handle delete password action
    setLoading(true);
    const res = await fetch(`/user/delete-password/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwToken}`,
      },
    });
    if (res.status === 422) {
      const resp = await res.json();
      const { message } = resp;
      setLoading(false);
      alert(message);
    } else if (res.status === 200) {
      // alert
      console.log("delete successfull");

      setLoading(false);
      fetchPassword();
    }
  };
  const savePassword = async (id) => {
    setLoading(true);
    const updatedPasswords = passwords.map((password) => {
      if (password.id === id) {
        return { ...password, isEditing: false };
      }
      return password;
    });
    setPasswords(updatedPasswords);

    const res = await fetch(`/user/edit-password/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwToken}`,
      },
      body: JSON.stringify({
        updated: update,
      }),
    });
    if (res.status === 422) {
      const resp = await res.json();
      const { message } = resp;
      setLoading(false);
      alert(message);
    } else if (res.status === 200) {
      setLoading(false);
      fetchPassword();
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchPassword();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="container password-list-container">
      {loading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          {passwords.length === 0 ? (
            <>
              <h4>Please Secure Your passwords!!</h4>
            </>
          ) : (
            <>
              <table className="password-list-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Password</th>
                    <th>Hide/Show</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {passwords.map((password) => (
                    <tr key={password._id}>
                      <td>{password.title}</td>
                      <td>
                        {password.isEditing ? (
                          <>
                            <input
                              type="text"
                              onChange={(e) => {
                                setUpdated(e.target.value);
                              }}
                              value={update}
                            />
                          </>
                        ) : (
                          <>
                            {password.showPassword
                              ? password.passkey
                              : "********"}
                          </>
                        )}
                      </td>
                      <td>
                        <button
                          onClick={() => handleTogglePassword(password._id)}
                        >
                          {password.showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        {/* ... */}
                      </td>
                      <td>
                        {password.isEditing ? (
                          <>
                            <button onClick={() => savePassword(password._id)}>
                              <FaSave />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleEditPassword(password._id)}
                            >
                              <FaEdit />
                            </button>
                          </>
                        )}

                        <button
                          onClick={() => handleDeletePassword(password._id)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default GetPassword;
