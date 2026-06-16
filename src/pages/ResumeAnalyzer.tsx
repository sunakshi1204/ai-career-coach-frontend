import { useState } from "react";
import axios from "axios";

function ResumeAnalyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const analyzeResume = async () => {
    if (!file) {
      alert("Please upload a PDF");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await axios.post(
        "https://ai-career-coach-backend-ye2g.onrender.com/analyze-resume/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      setResult(res.data);
    } catch (err) {
      console.log(err);
      alert("Error analyzing resume");
    }

    setLoading(false);
  };

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div style={{ marginBottom: "30px" }}>
      <h3 style={{ marginBottom: "15px" }}>{title}</h3>
      {children}
    </div>
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a, #111827, #0b1220)",
        padding: "40px",
        color: "#fff",
        fontFamily: "system-ui"
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "auto",
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(12px)",
          borderRadius: "20px",
          padding: "30px",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.5)"
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "10px" }}>📄 Resume Analyzer</h1>
        <p style={{ textAlign: "center", color: "#94a3b8", marginBottom: "30px" }}>
          Upload your resume and get AI-powered ATS analysis
        </p>

        {/* Upload Section */}
        <div style={{ display: "flex", gap: "15px", flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            style={{ color: "#94a3b8" }}
          />
          <button
            onClick={analyzeResume}
            style={{
              padding: "12px 22px",
              borderRadius: "10px",
              border: "none",
              background: "#38bdf8",
              color: "#0f172a",
              fontWeight: "700",
              cursor: "pointer"
            }}
          >
            Upload & Analyze
          </button>
        </div>

        {loading && (
          <div style={{ textAlign: "center", marginTop: "25px", color: "#38bdf8" }}>
            Analyzing Resume...
          </div>
        )}

        {result && (
          <div style={{ marginTop: "35px" }}>

            {/* ATS Score */}
            <div
              style={{
                background: "rgba(56,189,248,0.1)",
                border: "1px solid rgba(56,189,248,0.3)",
                padding: "20px",
                borderRadius: "15px",
                textAlign: "center",
                marginBottom: "25px"
              }}
            >
              <h2 style={{ color: "#38bdf8" }}>📊 ATS Score: {result.ats_score}</h2>
            </div>

            {/* Skills */}
            <Section title="Skills Extracted">
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {result?.skills?.map((skill: string, index: number) => (
                  <span
                    key={index}
                    style={{
                      padding: "8px 14px",
                      borderRadius: "20px",
                      background: "rgba(56,189,248,0.15)",
                      border: "1px solid rgba(56,189,248,0.3)",
                      color: "#38bdf8",
                      fontSize: "13px"
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Section>

            {/* Job Matches */}
            <Section title="🎯 Job Matches">
              {result?.job_matches?.length > 0 ? (
                <div style={{ display: "grid", gap: "15px" }}>
                  {result.job_matches.map((job: any, index: number) => (
                    <div
                      key={index}
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: "15px",
                        padding: "18px"
                      }}
                    >
                      <h4 style={{ color: "#fff" }}>{job.job}</h4>
                      <p style={{ color: "#38bdf8", fontWeight: "600" }}>
                        📊 Match Score: {job.match_percent}%
                      </p>
                      <p style={{ color: "#f87171" }}>
                        Missing Skills:{" "}
                        {job.missing_skills?.length > 0 ? job.missing_skills.join(", ") : "None"}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: "#fbbf24" }}>⚠ No matching jobs found</p>
              )}
            </Section>

            {/* Career Path Suggestions */}
            {result?.career_paths?.length > 0 && (
              <Section title="🚀 Career Path Suggestions">
                <div style={{ display: "grid", gap: "12px" }}>
                  {result.career_paths.map((path: any, index: number) => (
                    <div
                      key={index}
                      style={{
                        background: "rgba(168,85,247,0.1)",
                        border: "1px solid rgba(168,85,247,0.3)",
                        borderRadius: "12px",
                        padding: "15px"
                      }}
                    >
                      <h4 style={{ color: "#c084fc", marginBottom: "5px" }}>{path.title}</h4>
                      <p style={{ color: "#94a3b8", fontSize: "13px" }}>{path.description}</p>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {/* Detailed Feedback */}
            {result?.feedback && (
              <Section title="📊 Detailed Feedback">
                {result.feedback.strengths?.length > 0 && (
                  <div style={{ marginBottom: "15px" }}>
                    <h4 style={{ color: "#4ade80", marginBottom: "8px" }}>✅ Strengths</h4>
                    <ul style={{ color: "#cbd5e1", paddingLeft: "20px" }}>
                      {result.feedback.strengths.map((item: string, i: number) => (
                        <li key={i} style={{ marginBottom: "4px" }}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {result.feedback.weaknesses?.length > 0 && (
                  <div style={{ marginBottom: "15px" }}>
                    <h4 style={{ color: "#f87171", marginBottom: "8px" }}>❌ Weaknesses</h4>
                    <ul style={{ color: "#cbd5e1", paddingLeft: "20px" }}>
                      {result.feedback.weaknesses.map((item: string, i: number) => (
                        <li key={i} style={{ marginBottom: "4px" }}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {result.feedback.improvements?.length > 0 && (
                  <div style={{ marginBottom: "15px" }}>
                    <h4 style={{ color: "#38bdf8", marginBottom: "8px" }}>💡 Improvement Suggestions</h4>
                    <ul style={{ color: "#cbd5e1", paddingLeft: "20px" }}>
                      {result.feedback.improvements.map((item: string, i: number) => (
                        <li key={i} style={{ marginBottom: "4px" }}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {result.feedback.missing_sections?.length > 0 && (
                  <div>
                    <h4 style={{ color: "#fbbf24", marginBottom: "8px" }}>⚠ Missing Sections</h4>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {result.feedback.missing_sections.map((sec: string, i: number) => (
                        <span
                          key={i}
                          style={{
                            padding: "6px 12px",
                            borderRadius: "8px",
                            background: "rgba(251,191,36,0.15)",
                            border: "1px solid rgba(251,191,36,0.3)",
                            color: "#fbbf24",
                            fontSize: "12px"
                          }}
                        >
                          {sec}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </Section>
            )}

            {/* Education & Experience Check */}
            {result?.education_experience && (
              <Section title="🎓 Education & Experience Check">
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "12px"
                  }}
                >
                  <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: "10px", padding: "14px" }}>
                    <p style={{ color: "#94a3b8", fontSize: "12px", marginBottom: "4px" }}>Education</p>
                    <p style={{ color: "#fff", fontWeight: "600" }}>
                      {result.education_experience.education || "Not found"}
                    </p>
                  </div>

                  <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: "10px", padding: "14px" }}>
                    <p style={{ color: "#94a3b8", fontSize: "12px", marginBottom: "4px" }}>Experience</p>
                    <p style={{ color: "#fff", fontWeight: "600" }}>
                      {result.education_experience.experience_years ?? "0"} years
                    </p>
                  </div>

                  <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: "10px", padding: "14px" }}>
                    <p style={{ color: "#94a3b8", fontSize: "12px", marginBottom: "4px" }}>Internship</p>
                    <p style={{ color: "#fff", fontWeight: "600" }}>
                      {result.education_experience.internship_detected ? "Detected ✅" : "Not Found ❌"}
                    </p>
                  </div>

                  <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: "10px", padding: "14px" }}>
                    <p style={{ color: "#94a3b8", fontSize: "12px", marginBottom: "4px" }}>Projects</p>
                    <p style={{ color: "#fff", fontWeight: "600" }}>
                      {result.education_experience.project_count ?? "0"} found
                    </p>
                  </div>
                </div>
              </Section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ResumeAnalyzer;