import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import InfoBook from "./pages/InfoBook";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages-wrapper">
          <div className="pages">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/book/:id" element={<InfoBook />} /> 
            </Routes>
          </div>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
