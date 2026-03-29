import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PersonaCard from "../components/PersonaCard";

function PersonaSelection() {
  const navigate = useNavigate();

  const handleSelect = (persona) => {
    localStorage.setItem("persona", persona);
    navigate("/dashboard");
  };

  const personas = [
    {
      title: "Student",
      description:
        "Understand business news in simple language and learn how it affects education, jobs, and the economy.",
    },
    {
      title: "Investor",
      description:
        "Track markets, earnings, RBI moves, stock impact, and investment-relevant developments.",
    },
    {
      title: "Founder",
      description:
        "See startup trends, funding news, policy shifts, and competitor movements relevant to your business.",
    },
    {
      title: "Professional",
      description:
        "Stay informed about industry trends, company updates, and business developments impacting your career.",
    },
  ];

  return (
    <div className="page">
      <div className="container">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h1 className="hero-title" style={{ textAlign: "center" }}>
            Choose Your Persona
          </h1>
          <p className="hero-subtitle" style={{ textAlign: "center" }}>
            Personalize your newsroom based on what matters most to you.
          </p>

          <div className="grid grid-2">
            {personas.map((persona, index) => (
              <PersonaCard
                key={index}
                title={persona.title}
                description={persona.description}
                onClick={() => handleSelect(persona.title)}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default PersonaSelection;
