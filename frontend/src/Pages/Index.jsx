import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

function Index() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    const jwtToken = localStorage.getItem("jwtToken");

    if (!storedName || !jwtToken) {
      navigate("/login");
    } else {
      setUsername(storedName);
    }
  }, [navigate]);

  const hanldelogout = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("jwtToken");
    toast.warn("Logged out successfully", {
      position: "top-right",
      autoClose: 1000,
    });

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };
  return (
    <>
      <div className="hero">
        <nav className="navbar navbar-expend-lg w-100 px-5 py-3">
          <div className="container-fluid d-flex justify-content-between align-items-center">
            <div className="logo fw-logo fs-1 text-white">
              <a href="#" className="text-white text-decoration-none">
                Lo<span className="text-danger">go</span>
              </a>
            </div>
            <ul className="navbar-nav flex-row gap-4 mx-auto">
              <li className="nav-item">
                <a href="#" className="nav-link text-white fs-5 fw-bold">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link text-white fs-5 fw-bold">
                  About
                </a>
              </li>{" "}
              <li className="nav-item">
                <a href="#" className="nav-link text-white fs-5 fw-bold">
                  Services
                </a>
              </li>{" "}
              <li className="nav-item">
                <a href="#" className="nav-link text-white fs-5 fw-bold">
                  Contact
                </a>
              </li>
            </ul>

            <button
              className="btn btn-danger px-5 py-2 fs-5"
              onClick={hanldelogout}
            >
              Logout
            </button>
          </div>
        </nav>

        <div className="d-flex hero justify-content-center align-items-center bg-light flex-column">
          <h1 className="fw-bold text-white title">Welcome, {username}!</h1>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Index;
