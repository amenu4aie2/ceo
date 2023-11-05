import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Authentication/Login/Login";
import SignUp from "./Components/Authentication/SignUp/SignUp";
import { Createroom } from "./Components/CreateRoom/Createroom";
import Wait from "./Components/WaitingRoom/Wait";
import GameRoom from "./Components/GameRoom/GameRoom";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
        <Routes>
          <Route path="/SignUp" element={<SignUp />} />
        </Routes>
        <Routes>
          <Route path="/createroom" element={<Createroom />} />
        </Routes>
        <Routes>
          <Route  path="/waitingroom" element={<Wait/>} />
        </Routes>
        <Routes>
          <Route path="/room" element={<GameRoom/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
