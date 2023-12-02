import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Users from "./pages/Users";
import Login from "./pages/Login";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="pages-wrapper">
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
