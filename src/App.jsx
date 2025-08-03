import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home";
import ClassicTicTacToe from "./ClassicTicTacToe";
import MinimaxTicTacToe from "./MinimaxTicTacToe";
import "./App.css"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/classic" element={<ClassicTicTacToe />} />
        <Route path="/minimax" element={<MinimaxTicTacToe />} />
      </Routes>
    </Router>
  );
}
