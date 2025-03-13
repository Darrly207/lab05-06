"use client";
import { useDispatch } from "react-redux";
import "./loginCss.css";
import { register } from "@/store/authSlice";
import axios from "axios";
import { useState } from "react";
const Register = () => {
  const dispatch = useDispatch();
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://user-auth-api-nestjs.onrender.com/auth/register",
        {
          fullName,
          username,
          password,
        }
      );

      const userData = response.data;

      dispatch(register(userData));
      alert("Đăng ký thành công!");
    } catch (error) {
      alert("có lỗi xảy ra" + error);
    }
  };
  return (
    <div className="bodyLogin">
      <div className="wrapper">
        <form action="login" method="post" onSubmit={handleRegister}>
          <h2>Login</h2>
          <div className="input-field">
            <input
              type="name"
              required
              onChange={(e) => setFullName(e.target.value)}
            />
            <label>Enter your full name</label>
          </div>
          <div className="input-field">
            <input
              type="username"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Enter your username</label>
          </div>
          <div className="input-field">
            <input
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Enter your password</label>
          </div>

          <button type="submit">Log In</button>
          <div className="register">
            <p>
              Don&apos;t have an account? <a href="/.">login</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
