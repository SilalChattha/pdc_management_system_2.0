import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Root from "./components/Root";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Profile from "../src/components/Profile";

function App() {
  return (
    <>
      <Router>
        <div className="bg-success">
          <h1 className="header">Welcome to PDC 2.0 </h1>
        </div>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
