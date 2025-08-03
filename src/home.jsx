import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
    <div className="home" >
        <div className="cont">
      <h1>Tic Tac Toe </h1><h1 className="hub">hub</h1>
      </div>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li><Link to="/classic">🎮 Classic Version (2 Players)</Link></li>
        <li><Link to="/minimax">🤖 Play vs AI (Unbeatable)</Link></li>
      </ul>
    </div>
    <footer>Copyright &copy; 2025 Ashwin Upadhya</footer>
    </>
  );
}
