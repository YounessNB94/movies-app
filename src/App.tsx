import { Details } from "./pages/details/Details.tsx";


import "./App.css";

import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/homepage/HomePage.tsx";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/details" element={<Details />} />
    </Routes>
  );
};

export default App;
