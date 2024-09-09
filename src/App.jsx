import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./components/Navbar.jsx";

export function App() {
  return (
    <div className="App" id="app">
      <header></header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
