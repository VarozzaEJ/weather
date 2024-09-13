import React from "react";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
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
