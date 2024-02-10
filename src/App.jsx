import { useState } from "react";
import "./App.css";
import { Navbar } from "./components/navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Result from "./pages/result/Result";
import Detail from "./pages/detail/Detail";
function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="weather/:city" element={<Result />} />
          <Route path="details/:state" element={<Detail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
