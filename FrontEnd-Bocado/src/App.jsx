import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import { Faq } from "./Components/faq/faq";
import Home from "./pages/Home";
import Catalogo from "./pages/Catalogo/Catalogo";

import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo/" element={<Catalogo />} />
        </Routes>
      </main>
      <Faq />
    </>
  );
}

export default App;
