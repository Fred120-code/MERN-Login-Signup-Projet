import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { handleError, handleSuccess } from "../utils";
import { useNavigate } from "react-router-dom";

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
    console.log("Loginfo", loginInfo);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = loginInfo;

    if (!email || !password) {
      handleError("Please enter both email and password");
      return;
    }

    try {
      const url = "http://localhost:3000/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });

      const data = await response.json();

      const { success, message, error, jwtToken, name } = data;

      if (success) {
        handleSuccess(message);
        localStorage.setItem("jwtToken", jwtToken);
        localStorage.setItem("name", name);
        setTimeout(() => {
          navigate("/index");
        }, 1000);
      } else if (error) {
        const details = error?.details[0] || "Login failed";
        handleError(details);
      } else if (!success) {
        handleError(message || "Ivalid credentials");
      }

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }
    } catch (error) {
      handleError(error.response.data.message || "Login failed");
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
          <h2 className="text-center mb-4 fw-bold">Login To Account</h2>

          <form className="login-wrapper" onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="form-label text-white">
                Email
              </label>
              <input
                type="text"
                className="form-control form-control-lg bg-transparent text-white border-white "
                id="email"
                name="email"
                value={loginInfo.email}
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
                value={loginInfo.password}
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

            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="rememberMe"
                />
                <label
                  htmlFor="rememberMe"
                  className="form-check-label text-white"
                >
                  Remember Me
                </label>
              </div>
              <a href="#" className="text-decoration-none text-white-50">
                Forgot password
              </a>
            </div>

            <button
              type="submit"
              className="btn btn-light w-100 py-2 fw-semibold"
            >
              Login
            </button>
          </form>

          <div className="text-center mt-4">
            <span className="text-white">You don't have an account ? </span>
            <span
              className="text-light cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Signup here
            </span>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Login;
