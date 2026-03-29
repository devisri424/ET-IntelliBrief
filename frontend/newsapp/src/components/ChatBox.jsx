import { useState } from "react";
import API from "../services/api";
import Loader from "./Loader";

function ChatBox({ briefingText }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const persona = localStorage.getItem("persona") || "Student";

  const askQuestion = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setAnswer("");

    try {
      const res = await API.post("/ai/ask", {
        briefing_text: briefingText,
        persona: persona,
        question: question,
      });

      setAnswer(res.data.answer);
    } catch (error) {
      console.error("Chat Error:", error);
      setAnswer("Something went wrong while getting the answer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-box">
      <h2 className="section-title">Ask ET AI</h2>
      <p className="hero-subtitle">
        Ask follow-up questions about this story.
      </p>

      <textarea
        className="textarea"
        placeholder="Example: Explain this like I’m a beginner..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <button
        onClick={askQuestion}
        className="button"
        style={{ marginTop: "15px" }}
      >
        Ask Question
      </button>

      {loading && <Loader />}

      {answer && !loading && (
        <div className="answer-box">
          <h3 className="section-title" style={{ fontSize: "22px" }}>
            Answer
          </h3>
          <p className="section-text">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default ChatBox;
