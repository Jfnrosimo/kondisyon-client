//Import routing
import { Routes, Route } from "react-router-dom";

//Import pages
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </div>
  );
}

export default App;
