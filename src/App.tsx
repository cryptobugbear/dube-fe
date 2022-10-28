import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListPage from "./components/ListPage/ListPage";
import AddInventory from "./components/AddInventory/AddInventory";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ListPage />} />
          <Route path="/add" element={<AddInventory />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
