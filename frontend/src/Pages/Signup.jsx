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
        <div className="modern-glass border-0 shadow p-5 rounded-4 text-white">
          <h2 className="text-center mb-4 fw-bold">Create Account</h2>

          <form className="signup-wrapper" onSubmit={handleSingup}>
            <div className="mb-4">
              <label htmlFor="name" className="form-label text-white">
                Name
              </label>
                <input 
                    type="text"
                    className="form-control form-control-lg"
                    id="name"
                    name="name"
                    value={signupInfo.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
