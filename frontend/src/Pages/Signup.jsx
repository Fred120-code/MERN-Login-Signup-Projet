import { useState } from "react";
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
    console.log("Signup Info", signupInfo);
  };

  const handleSingup = async (e) => {
    e.preventDefault();

    const { name, email, password } = signupInfo;

    if (!name || !email || !password) {
      handleError("Please fill in all fields");
      return;
    }
    try {
      const url = "http://localhost:3000/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });

      const data = await response.json();

      const { success, message, error } = data;

      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
      console.log(data);
      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }
    } catch (error) {
      handleError(error.response.data.message || "Signup failed");
    }
  };

  const [showpassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showpassword);
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
                className="form-control form-control-lg bg-transparent text-white border-white "
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
                className="form-control form-control-lg bg-transparent text-white border-white "
                id="email"
                name="email"
                value={signupInfo.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4 position-relative">
              <label htmlFor="password" className="form-label text-white">
                Password
              </label>
              <input
                type={showpassword ? "text" : "password"}
                className="form-control form-control-lg bg-transparent text-white border-white "
                id="password"
                name="password"
                value={signupInfo.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
              <i
                className={`bi ${showpassword ? "bi-eye-slash" : "bi-eye"} `}
                onClick={togglePasswordVisibility}
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
            <button
              type="submit"
              className="btn btn-light w-100 py-2 fw-semibold"
            >
              Sign Up
            </button>
          </form>

          <div className="text-center mt-4">
            <span className="text-white">Already have an account? </span>
            <span
              className="text-light cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login here
            </span>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Signup;
