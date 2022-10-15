import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Nav from "./components/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./pages/Dashboard";
import AuditResult from "./pages/AuditResult";
import Error from "./pages/Error";
import Footer from "./components/Footer";
import bgImage from "./bg.jpg";

function App() {
  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${bgImage})`,
        height: "100vh",
        backgroundSize: "cover",
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/checklist" element={<Dashboard />} />
          <Route path="/severity" element={<AuditResult />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
