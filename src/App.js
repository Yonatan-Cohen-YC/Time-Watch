import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import ShiftsList from "./Pages/ShiftsList";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shifts" element={<ShiftsList />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
