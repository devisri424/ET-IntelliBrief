import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import NewsCard from "../components/NewsCard";
import Loader from "../components/Loader";
import API from "../services/api";

function Dashboard() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const persona = localStorage.getItem("persona") || "Student";

  const getPersonaQuery = () => {
    switch (persona.toLowerCase()) {
      case "student":
        return "education OR economy OR AI OR jobs";
      case "investor":
        return "stock market OR RBI OR economy OR earnings";
      case "founder":
        return "startup OR funding OR business OR policy";
      case "professional":
        return "industry OR company OR business OR jobs";
      default:
        return "business OR economy";
    }
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const query = getPersonaQuery();
        const res = await API.get(
          `/news/?query=${encodeURIComponent(query)}&page_size=8`
        );
        setNews(res.data.articles || []);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const openBriefing = (article) => {
    localStorage.setItem("selectedArticle", JSON.stringify(article));
    navigate("/briefing");
  };

  return (
    <div className="page">
      <Navbar />

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: "30px" }}
        >
          <h1 className="hero-title">
            My ET — {persona} Edition
          </h1>
          <p className="hero-subtitle">
            Personalized business intelligence tailored to your interests.
          </p>
        </motion.div>

        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-3">
            {news.map((article, index) => (
              <NewsCard
                key={index}
                title={article.title}
                description={article.description}
                source={article.source?.name || "News Source"}
                onClick={() => openBriefing(article)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
