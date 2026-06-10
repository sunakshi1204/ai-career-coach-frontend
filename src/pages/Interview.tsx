import { useEffect, useState,useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


type QuestionType = {
  question_id: number | null;
  question: string;
  type?: string;
  input?: string;
  expected_output?: string;
  is_coding?: boolean;
};

type TopicType = {
  id: number;
  name: string;
};

function Interview() {
  const params = useParams<any>();

  const fieldId = params.fieldId || params.id;
  const categoryId = params.categoryId || params.catId;

  const [feedback, setFeedback] = useState("");
  const [interviewDone, setInterviewDone] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [started, setStarted] = useState(false);
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [step, setStep] = useState<"topics" | "interview">("topics");
  const [stepIndex, setStepIndex] = useState(0);
  const [question, setQuestion] = useState<QuestionType | null>(null);
  const [language, setLanguage] = useState("python");
  const [answer, setAnswer] = useState("");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [topics, setTopics] = useState<string[]>([]);
  const [availableTopics, setAvailableTopics] = useState<TopicType[]>([]);
  const loadedRef = useRef(false);

  const isCoding = question?.is_coding;
  const qType = question?.type?.toLowerCase();

  // useEffect(() => {
  //   loadTopics();
  // }, []);
  useEffect(() => {
  if (loadedRef.current) return;
  loadedRef.current = true;

  loadTopics();
}, []);

const loadTopics = async () => {
  const res = await axios.get(
    `https://ai-career-coach-backend-ye2g.onrender.com/get-topics/${categoryId}/`
  );

  const uniqueTopics = Array.from(
    new Map(res.data.map((t: any) => [t.id, t])).values()
  );

  setAvailableTopics(uniqueTopics);
};

  const handleStart = () => {
    setStarted(true);
    setStep("topics");
  };

  const handleStartWithTopics = async () => {
    try {
      const res = await axios.post(
        "https://ai-career-coach-backend-ye2g.onrender.com/start-interview/",
        {
          name: "User",
          field_id: fieldId,
          category_id: categoryId,
          topics: topics,
        }
      );
      setSessionId(res.data.session_id);
      setStep("interview");
    } catch (err) {
      console.log("Session create error:", err);
    }
  };

  useEffect(() => {
    if (step === "interview" && sessionId !== null) {
      fetchQuestion(sessionId, 0);
      setStepIndex(0);
    }
  }, [step, sessionId]);

  const fetchQuestion = async (sid: number, stepNo: number) => {
    try {
      const res = await axios.post(
        "https://ai-career-coach-backend-ye2g.onrender.com/get-next-question/",
        {
          session_id: sid,
          step: stepNo,
        }
      );
      console.log("QUESTION RESPONSE:", res.data);
      setQuestion(res.data);
      setAnswer("");
      setCode("");
      setOutput("");
      setFeedback("");
      return res.data;
    } catch (err) {
      console.log("Fetch question error:", err);
      return null;
    }
  };

  const handleNext = async () => {
    if (!sessionId) return;

    if (question?.question_id && !feedback) {
      await axios.post(
        "https://ai-career-coach-backend-ye2g.onrender.com/submit-answer/",
        {
          session_id: sessionId,
          question_id: question.question_id,
          answer: isCoding
            ? code || "No code submitted"
            : answer || "No answer submitted",
        }
      );
    }

    const next = stepIndex + 1;
    setStepIndex(next);

    const res = await fetchQuestion(sessionId, next);

    if (!res || res.done) {
      const report = await axios.get(
        `https://ai-career-coach-backend-ye2g.onrender.com/report/${sessionId}/`
      );
      setAnalysis(report.data);
      setInterviewDone(true);
    }
  };

  const runCode = async () => {
    const res = await axios.post(
      "https://ai-career-coach-backend-ye2g.onrender.com/run-code/",
      {
        code,
        language: language,
      }
    );
    setOutput(res.data.output);
  };

  const submitCode = async () => {
    if (!sessionId || !question?.question_id) return;
    if (feedback) return;
    try {
      const res = await axios.post(
        "https://ai-career-coach-backend-ye2g.onrender.com/submit-answer/",
        {
          session_id: sessionId,
          question_id: question.question_id,
          answer: code || "No code submitted",
        }
      );
      setFeedback(res.data.feedback);
    } catch (err) {
      console.log("Submit code error:", err);
    }
  };

  const submitAnswer = async () => {
    if (!sessionId || !question?.question_id) return;
    if (feedback) return;
    try {
      const res = await axios.post(
        "https://ai-career-coach-backend-ye2g.onrender.com/submit-answer/",
        {
          session_id: sessionId,
          question_id: question.question_id,
          answer: answer,
        }
      );
      setFeedback(res.data.feedback);
    } catch (err) {
      console.log("Submit answer error:", err);
    }
  };

  const speak = () => {
    if (!question?.question) return;
    const speech = new SpeechSynthesisUtterance(question.question);
    speech.lang = "en-IN";
    window.speechSynthesis.speak(speech);
  };

  // =================== START SCREEN ===================
  if (!started) {
    return (
      <div style={styles.center}>
        <button style={styles.startBtn} onClick={handleStart}>
          Start Interview 🚀
        </button>
      </div>
    );
  }

  // =================== DONE SCREEN ===================
  if (interviewDone && analysis) {
    return (
      <div style={styles.page}>
        <div style={styles.header}>📊 Interview Analysis</div>
        <div style={styles.card}>
          <h2>✅ Interview Complete!</h2>
          <h3>Total Questions: {analysis.total_questions}</h3>
          <h3>Average Score: {analysis.average_score}/10</h3>

          <h3>💪 Strengths:</h3>
          {analysis.strengths.length > 0 ? (
            analysis.strengths.map((q: string, i: number) => (
              <p key={i} style={{ color: "#FFD700" }}>
                ✅ {q}
              </p>
            ))
          ) : (
            <p style={{ color: "#fff" }}>No strengths recorded yet</p>
          )}

          <h3>⚠️ Weaknesses:</h3>
          {analysis.weaknesses.length > 0 ? (
            analysis.weaknesses.map((q: string, i: number) => (
              <p key={i} style={{ color: "#ff6b6b" }}>
                ❌ {q}
              </p>
            ))
          ) : (
            <p style={{ color: "#fff" }}>No weaknesses recorded</p>
          )}

          <button
            style={styles.yellowBtn}
            onClick={() => (window.location.href = "/")}
          >
            🏠 Go Home
          </button>
        </div>
      </div>
    );
  }

  // =================== MAIN INTERVIEW SCREEN ===================
  return (
    <>
      {feedback && (
        <div style={styles.feedbackCard}>
          <h3>📊 AI Evaluation</h3>
          <pre>{feedback}</pre>
        </div>
      )}

      <div style={styles.page}>
        <div style={styles.header}>interview.co | AI Interview Simulator</div>

        {/* ========== TOPICS STEP ========== */}
        {step === "topics" && (
          <div style={styles.card}>
            <h3 style={{ color: "#FFD700" }}>📂 Select Topics (Optional)</h3>
            <p style={{ color: "#fff", fontSize: 13 }}>
              If no topic is selected, questions will be generated from all
              topics.
            </p>
            <div
              style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 10 }}
            >
              {availableTopics.map((t) => (
                <button
                  key={t.id}
                  onClick={() =>
                    setTopics((prev) =>
                      prev.includes(t.name)
                        ? prev.filter((x) => x !== t.name)
                        : [...prev, t.name]
                    )
                  }
                  style={{
                    padding: "8px 14px",
                    border: "2px solid #FFD700",
                    borderRadius: 6,
                    cursor: "pointer",
                    fontWeight: "bold",
                    background: topics.includes(t.name)
                      ? "#FFD700"
                      : "transparent",
                    color: topics.includes(t.name) ? "#000" : "#FFD700",
                  }}
                >
                  {t.name}
                </button>
              ))}
            </div>
            <button
              style={{ ...styles.yellowBtn, marginTop: 20 }}
              onClick={handleStartWithTopics}
            >
              Start Interview 🚀
            </button>
          </div>
        )}

        {/* ========== INTERVIEW STEP ========== */}
        {step === "interview" && (
          <>
            {/* Question Card */}
            <div style={styles.card}>
              <h2 style={{ color: "#fff" }}>
                {question?.question || "Loading question..."}
              </h2>
              <button style={styles.yellowBtn} onClick={speak}>
                🔊 Speak
              </button>
            </div>

            {/* CODING QUESTION */}
            {isCoding && (
              <>
                <div style={{ marginBottom: "10px" }}>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    style={{ padding: "8px", border: "2px solid black" }}
                  >
                    <option value="python">Python</option>
                    <option value="cpp">C++</option>
                    <option value="java">Java</option>
                    <option value="c">C</option>
                  </select>
                </div>
                <div style={styles.card}>
                  <h3 style={{ color: "#FFD700" }}>💻 Code Editor</h3>
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    style={styles.codeBox}
                  />
                  <button style={styles.blackBtn} onClick={runCode}>
                    ▶ Run Code
                  </button>
                  {output && <pre style={styles.output}>{output}</pre>}
                  <button
                    style={{ ...styles.yellowBtn, marginTop: 12 }}
                    onClick={submitCode}
                  >
                    ✅ Submit Code
                  </button>
                </div>
              </>
            )}

            {/* WEB QUESTION */}
            {qType === "web" && !isCoding && (
              <div style={styles.card}>
                <h3 style={{ color: "#FFD700" }}>🌐 HTML Preview</h3>
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  style={styles.textarea}
                />
                <div
                  style={styles.preview}
                  dangerouslySetInnerHTML={{ __html: answer }}
                />
              </div>
            )}

            {/* DBMS QUESTION */}
            {qType === "dbms" && (
              <div style={styles.card}>
                <h3 style={{ color: "#FFD700" }}>🗄 SQL Query</h3>
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  style={styles.textarea}
                />
                <button style={styles.yellowBtn} onClick={submitAnswer}>
                  ✅ Submit Answer
                </button>
              </div>
            )}

            {/* THEORY QUESTION */}
            {!isCoding && qType !== "web" && qType !== "dbms" && (
              <div style={styles.card}>
                <h3 style={{ color: "#FFD700" }}>🧠 Your Answer</h3>
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  style={styles.textarea}
                  placeholder="Apna answer yahan likhein..."
                />
                <button style={styles.yellowBtn} onClick={submitAnswer}>
                  ✅ Submit Answer
                </button>
                <button
                  style={{ ...styles.yellowBtn, marginLeft: 10 }}
                  onClick={speak}
                >
                  🎤 Speak Question
                </button>
              </div>
            )}

            <button style={styles.nextBtn} onClick={handleNext}>
              Next ➡️
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default Interview;

const styles: any = {
  page: {
    background: "linear-gradient(135deg, #0f172a, #111827, #0b1220)",
    minHeight: "100vh",
    padding: "30px",
    fontFamily: "system-ui",
    color: "#fff",
  },
  header: {
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "#38bdf8",
    padding: "18px",
    fontSize: "20px",
    fontWeight: "700",
    borderRadius: "16px",
    marginBottom: "25px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
  },
  center: {
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #0f172a, #111827, #0b1220)",
  },
  startBtn: {
    background: "#38bdf8",
    color: "#0f172a",
    border: "none",
    padding: "14px 28px",
    fontWeight: "700",
    cursor: "pointer",
    borderRadius: "12px",
    fontSize: "16px",
    boxShadow: "0 0 20px rgba(56,189,248,0.3)",
  },
  card: {
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.08)",
    padding: "20px",
    marginBottom: "20px",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
  },
  feedbackCard: {
    background: "rgba(56,189,248,0.08)",
    border: "1px solid rgba(56,189,248,0.3)",
    padding: "20px",
    margin: "20px",
    borderRadius: "16px",
    color: "#e2e8f0",
    backdropFilter: "blur(10px)",
    maxHeight: "300px",
    overflowY: "auto",
    wordBreak: "break-word",
  },
  textarea: {
    width: "100%",
    height: "140px",
    border: "1px solid rgba(56,189,248,0.25)",
    padding: "12px",
    borderRadius: "12px",
    boxSizing: "border-box",
    background: "rgba(255,255,255,0.05)",
    color: "#fff",
    outline: "none",
    resize: "vertical",
  },
  codeBox: {
    width: "100%",
    height: "260px",
    background: "#0d1117",
    color: "#38bdf8",
    padding: "15px",
    borderRadius: "12px",
    border: "1px solid rgba(56,189,248,0.25)",
    fontFamily: "Consolas, monospace",
    boxSizing: "border-box",
    resize: "vertical",
  },
  blackBtn: {
    background: "#1e293b",
    color: "#38bdf8",
    padding: "12px 18px",
    border: "1px solid rgba(56,189,248,0.3)",
    marginTop: "12px",
    cursor: "pointer",
    borderRadius: "10px",
    fontWeight: "600",
  },
  yellowBtn: {
    background: "#38bdf8",
    color: "#0f172a",
    padding: "12px 18px",
    border: "none",
    marginTop: "12px",
    fontWeight: "700",
    cursor: "pointer",
    borderRadius: "10px",
  },
  output: {
    background: "#0d1117",
    color: "#22c55e",
    padding: "15px",
    marginTop: "12px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.08)",
    overflowX: "auto",
  },
  preview: {
    border: "1px solid rgba(56,189,248,0.25)",
    borderRadius: "12px",
    height: "250px",
    marginTop: "15px",
    background: "#fff",
    overflow: "auto",
  },
  nextBtn: {
    width: "100%",
    background: "#38bdf8",
    color: "#0f172a",
    padding: "14px",
    border: "none",
    fontWeight: "700",
    cursor: "pointer",
    marginTop: "15px",
    borderRadius: "12px",
    fontSize: "16px",
    boxShadow: "0 0 20px rgba(56,189,248,0.25)",
  },
};