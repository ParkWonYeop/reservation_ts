import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './login';
import Main from "./main"
import Signup from "./signup"
import Home from './home'
import My from './my';
import Admin from './admin';

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path={"/"} element={<Main />}></Route>
            <Route path={"/login"} element={<Login />}></Route>
            <Route path={"/signup"} element={<Signup />}></Route>
            <Route path={"/home"} element={<Home />}></Route>
            <Route path={"/mypage"} element={<My />}></Route>
            <Route path={"/admin"} element={<Admin />}></Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;