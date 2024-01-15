import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function main() {
    const [room, setRoom] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
      const requestUrl = "http://localhost:8080/room/list";
      fetch('')
    }, [])
    const goLogin = () => {
        navigate("/login")
    }
    const goSignup = () => {
        navigate("/signup")
    }
    return (
      <div className="Main">
        <button onClick={goLogin}>로그인</button><br></br>
        <button onClick={goSignup}>회원가입</button>
      </div>
    );
  }