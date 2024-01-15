import { useState } from "react";
import message from "./message";
import { useNavigate } from "react-router-dom";

const signupResponse = async (phoneNumber: string, password: string, name:string) => {
    const requestUrl = "http://localhost:8080/auth/signup";
    try {
      const res = await fetch(requestUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber,
          password: password,
          name: name
        }),
      })
  
      return res.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  export default function signup() {
    const navigate = useNavigate();
    const goLogin = () => {
        navigate("/login")
    }
    
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [name, setName] = useState<string>("");
  
    const phoneNumberHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      setPhoneNumber(event.currentTarget.value)
    }
  
    const passwordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.currentTarget.value)
    }

    const nameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      setName(event.currentTarget.value)
    }
  
    const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log(phoneNumber, password);
      const result : message = await signupResponse(phoneNumber, password, name);
      if(result.status === "OK") {
        goLogin();
      }
    }
    
    return (
      <div className="Login">
        <div>
          <form onSubmit={onSubmitHandler}>
            <label>전화번호</label>
            <input type='text' value={phoneNumber} onChange={phoneNumberHandler}/><br></br>
            <label>비밀번호</label>
            <input type='password' value={password} onChange={passwordHandler}/> <br></br>
            <label>이름</label>
            <input type='text' value={name} onChange={nameHandler}/><br></br>
            <button type="submit">회원가입</button>
          </form>
        </div>
      </div>
    );
  }