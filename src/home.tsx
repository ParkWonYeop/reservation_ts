import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function login() {
    const navigate = useNavigate();
    const goLogin = () => {
        navigate("/login")
    }
    const goSignup = () => {
        navigate("/signup")
    }
    return (
      <div className="Home">
        <button onClick={goLogin}>로그인</button><br></br>
        <button onClick={goSignup}>회원가입</button>
      </div>
    );
  }