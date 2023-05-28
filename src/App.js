import "./App.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import React from "react";

function App() {
  const navigate = useNavigate();
  return (
    <div>
      <div id="header">
        <div id="header-area"></div>
      </div>
      <div id="body">
        <Routes>
          <Route exact={true} path={"/"} element={<>kmk</>} />
          <Route exact={true} path={"/upload"} element={<>kmk</>} />
        </Routes>
      </div>
      <div id="footer"></div>
    </div>
  );
}

export default App;
