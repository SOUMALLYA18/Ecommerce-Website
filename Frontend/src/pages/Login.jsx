// src/pages/Login.jsx
import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true); // true = login, false = signup
  const { token, setToken, backendUrl, navigate } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleToggle = () => {
    setIsLogin((prev) => !prev);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const data = isLogin ? { email, password } : { name, email, password };

    const endpoint = isLogin ? "login" : "register";

    try {
      const response = await axios.post(
        `http://localhost:3000/api/user/${endpoint}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("✅ Response:", response.data);

      if (response.status === 200 || response.status === 201) {
        // Save token or user info
        localStorage.setItem("token", response.data.token);
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        console.error("❌ Server Error:", error.response.data);
        alert(error.response.data.msg); // Optional user feedback
      } else {
        console.error("❌ Network Error:", error.message);
      }
    }
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (!token && savedToken) {
      setToken(savedToken);
      navigate("/");
    }
  }, [token, setToken, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        <form onSubmit={onSubmitHandler} className="flex flex-col gap-4">
          {!isLogin && (
            <input
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
              type="text"
              placeholder="Name"
              className="px-4 py-2 border rounded"
            />
          )}
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            type="email"
            placeholder="Email"
            className="px-4 py-2 border rounded"
          />
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            type="password"
            placeholder="Password"
            className="px-4 py-2 border rounded"
          />
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <div className="text-center mt-4">
          {isLogin ? (
            <>
              <p>Don't have an account?</p>
              <button
                onClick={handleToggle}
                className="text-blue-500 hover:underline mt-1"
              >
                Create one
              </button>
            </>
          ) : (
            <>
              <p>Already have an account?</p>
              <button
                onClick={handleToggle}
                className="text-blue-500 hover:underline mt-1"
              >
                Login here
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
