import { useState } from "react";
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './login';
import Home from "./home"
import Signup from "./signup"
import { useNavigate } from "react-router-dom";

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path={"/"} element={<Home />}></Route>
            <Route path={"/login"} element={<Login />}></Route>
            <Route path={"/signup"} element={<Signup />}></Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;