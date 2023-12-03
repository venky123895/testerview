import React, { useState } from "react";
import "./App.css";
import Nav from "./components/navbar/NavBar";
import Home from "./components/home/Home";

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <div className="App">
      <Nav />
      <Home isLoading={isLoading} setIsLoading={setIsLoading} />
    </div>
  );
}

export default App;
