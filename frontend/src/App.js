//Import routing
import { Routes, Route } from "react-router-dom";

//Import pages
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Map from "./components/Map/Map";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<History />} />
        <Route path="/admin" element={<Map />} />
      </Routes>
    </div>
  );
}

export default App;
