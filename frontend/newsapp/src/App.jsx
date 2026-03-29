import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PersonaSelection from "./pages/PersonaSelection";
import Dashboard from "./pages/Dashboard";
import BriefingPage from "./pages/BriefingPage";
import ExplainerPage from "./pages/ExplainerPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/persona" element={<PersonaSelection />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/briefing" element={<BriefingPage />} />
      <Route path="/explainer" element={<ExplainerPage />} />
    </Routes>
  );
}

export default App;
