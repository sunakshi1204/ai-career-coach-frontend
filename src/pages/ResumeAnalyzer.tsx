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
      <h1
        style={{
          textAlign: "center",
          marginBottom: "10px"
        }}
      >
        📄 Resume Analyzer
      </h1>

      <p
        style={{
          textAlign: "center",
          color: "#94a3b8",
          marginBottom: "30px"
        }}
      >
        Upload your resume and get AI-powered ATS analysis
      </p>

      {/* Upload Section */}
      <div
        style={{
          display: "flex",
          gap: "15px",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          style={{
            color: "#94a3b8"
          }}
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

      {/* Loading */}
      {loading && (
        <div
          style={{
            textAlign: "center",
            marginTop: "25px",
            color: "#38bdf8"
          }}
        >
           Analyzing Resume...
        </div>
      )}

      {/* Result */}
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
            <h2 style={{ color: "#38bdf8" }}>
              📊 ATS Score: {result.ats_score}
            </h2>
          </div>

          {/* Skills */}
          <h3 style={{ marginBottom: "15px" }}>
            Skills Extracted
          </h3>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginBottom: "30px"
            }}
          >
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

          {/* Job Matches */}
          <h3 style={{ marginBottom: "15px" }}>
             Job Matches
          </h3>

          {result?.job_matches?.length > 0 ? (
            <div
              style={{
                display: "grid",
                gap: "15px"
              }}
            >
              {result.job_matches.map((job: any, index: number) => (
                <div
                  key={index}
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "15px",
                    padding: "18px",
                    transition: "0.3s"
                  }}
                >
                  <h4 style={{ color: "#fff" }}>
                     {job.job}
                  </h4>

                  <p
                    style={{
                      color: "#38bdf8",
                      fontWeight: "600"
                    }}
                  >
                    📊 Match Score: {job.match_percent}%
                  </p>

                  <p
                    style={{
                      color: "#f87171"
                    }}
                  >
                    Missing Skills:{" "}
                    {job.missing_skills?.length > 0
                      ? job.missing_skills.join(", ")
                      : "None"}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: "#fbbf24" }}>
              ⚠ No matching jobs found
            </p>
          )}
        </div>
      )}
    </div>
  </div>
);
}
export default ResumeAnalyzer;
