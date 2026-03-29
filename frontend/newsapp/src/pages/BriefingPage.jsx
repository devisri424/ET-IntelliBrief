import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import ChatBox from "../components/ChatBox";
import API from "../services/api";

function BriefingPage() {
  const navigate = useNavigate();
  const article = JSON.parse(localStorage.getItem("selectedArticle"));

  const [briefing, setBriefing] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!article) {
      navigate("/dashboard");
      return;
    }

    const fetchAIContent = async () => {
      try {
        const articleText = [
          article.title,
          article.description,
          article.content || "",
        ];

        const briefRes = await API.post("/ai/generate-brief", {
          topic: article.title,
          articles: articleText,
        });

        const generatedBrief = briefRes.data.briefing;
        setBriefing(generatedBrief);

        // Save briefing for explainer and chat reuse
        localStorage.setItem("latestBriefing", generatedBrief);
      } catch (error) {
        console.error("Error generating AI briefing:", error);
        setBriefing("Failed to generate briefing. Please try again after a minute.");
      } finally {
        setLoading(false);
      }
    };

    fetchAIContent();
  }, []);

  if (!article) return null;

  return (
    <div className="page">
      <Navbar />

      <div className="container">
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="section-box">
              <p className="source">{article.source}</p>
              <h1 className="hero-title">{article.title}</h1>
              <p className="hero-subtitle">{article.description}</p>

              <div className="answer-box">
                <h2 className="section-title">AI Deep Briefing</h2>
                <p className="section-text">{briefing}</p>
              </div>

              <button
                onClick={() => navigate("/explainer")}
                className="button"
                style={{ marginTop: "20px" }}
              >
                Open Tamil / Hindi Explainer
              </button>
            </div>

            <ChatBox briefingText={briefing} />
          </>
        )}
      </div>
    </div>
  );
}

export default BriefingPage;
