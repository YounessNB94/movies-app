import { Details } from "./pages/details/Details.tsx";

import React, { useEffect, useState } from "react";

import "./App.css";

import { Route, Routes } from "react-router-dom";
import { Homepage } from "./pages/homepage/HomePage.tsx";
const App = () => {
  return (
    <div className="main">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/details" element={<Details />} />
      </Routes>
    </div>
  );
};

export default App;
