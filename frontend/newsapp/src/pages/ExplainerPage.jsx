import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import API from "../services/api";

function ExplainerPage() {
  const [language, setLanguage] = useState("Tamil");
  const [explainer, setExplainer] = useState("");
  const [loading, setLoading] = useState(false);

  const briefingText = localStorage.getItem("latestBriefing") || "";

  const generateExplainer = async (lang) => {
    if (!briefingText) {
      setExplainer("No briefing available. Please open a story first.");
      return;
    }

    setLoading(true);
    setExplainer("");

    try {
      const res = await API.post("/ai/explainer", {
        briefing_text: briefingText,
        language: lang,
      });

      setExplainer(res.data.explainer);
    } catch (error) {
      console.error("Explainer Error:", error);
      setExplainer("Something went wrong while generating the explainer.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateExplainer(language);
  }, [language]);

  return (
    <div className="page">
      <Navbar />

      <div className="container">
        <div className="section-box">
          <h1 className="hero-title">Vernacular Explainer</h1>
          <p className="hero-subtitle">
            Understand business news in a simpler, localized way.
          </p>

          <div className="language-buttons">
            <button
              onClick={() => setLanguage("Tamil")}
              className={`lang-btn ${language === "Tamil" ? "active" : ""}`}
            >
              Tamil
            </button>

            <button
              onClick={() => setLanguage("Hindi")}
              className={`lang-btn ${language === "Hindi" ? "active" : ""}`}
            >
              Hindi
            </button>
          </div>

          {loading ? (
            <Loader />
          ) : (
            <div className="answer-box">
              <h2 className="section-title">{language} Explainer</h2>
              <p className="section-text">{explainer}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ExplainerPage;
