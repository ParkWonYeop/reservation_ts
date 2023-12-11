import { useState } from "react";

const loginResponse = async (phoneNumber: string, password: string) => {
    const requestUrl = "http://localhost:8080/auth/login";
    try {
      const res = await fetch(requestUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber,
          password: password,
        }),
      })
  
      return res.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  export default function login() {
    // useState의 타입 정의
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [password, setPassword] = useState<string>("");
  
    // 이벤트 핸들러의 타입 정의
    const phoneNumberHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      setPhoneNumber(event.currentTarget.value)
    }
  
    const passwordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.currentTarget.value)
    }
  
    // 비동기 처리 개선
    const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log(phoneNumber, password);
      const result = await loginResponse(phoneNumber, password);
      console.log(result);
    }
    
    return (
      <div className="Login">
        <div>
          <form onSubmit={onSubmitHandler}>
            <label>PhoneNumber</label>
            <input type='text' value={phoneNumber} onChange={phoneNumberHandler}/><br></br>
            <label>Password</label>
            <input type='password' value={password} onChange={passwordHandler}/> <br></br>
            <button type="submit">로그인</button>
          </form>
        </div>
      </div>
    );
  }