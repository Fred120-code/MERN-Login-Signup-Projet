import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { handleError, handleSuccess } from "../utils";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copySignupInfo = { ...signupInfo };
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
    console.log("Login Info", signupInfo);
  };

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center vh-100 modern-bg">
        <div
          className="modern-glass border-0 shadow p-5 rounded-4 text-white"
          style={{ width: "100%", maxWidth: "420px" }}
        >
          <h2 className="text-center mb-4 fw-bold">Create Account</h2>

          <form className="signup-wrapper" onSubmit={handleSingup}>
            <div className="mb-4">
              <label htmlFor="name" className="form-label text-white">
                Name
              </label>
              <input
                type="text"
                className="form-control form-control-lg bg-transaprent text-white border-0 border-bottom border-white "
                id="name"
                name="name"
                value={signupInfo.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="form-label text-white">
                Email
              </label>
              <input
                type="text"
                className="form-control form-control-lg bg-transaprent text-white border-0 border-bottom border-white "
                id="email"
                name="email"
                value={signupInfo.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="form-label text-white">
                Password
              </label>
              <input
                type={chowpassword ? "text" : "password"}
                className="form-control form-control-lg bg-transaprent text-white border-0 border-bottom border-white "
                id="password"
                name="password"
                value={signupInfo.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
              <i
                className={`bi ${chowpassword ? "bi-eye-slash" : "bi-eye"} fs-5 text-white position-absolute top-50 end-0 translate-middle-y me-3 cursor-pointer`}
                onClick={() => setShowPassword(!chowpassword)}
                style={{ 
                    position: "absolute",
                    top: "50%",
                    right: "15px",
                    cursor: "pointer",
                    color: "white",
                    fontSize: "1.2rem",
                }}
              ></i>
            </div>
            <button type="submit" className="btn btn-light w-100 py-2 fw-semibold">
                Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
