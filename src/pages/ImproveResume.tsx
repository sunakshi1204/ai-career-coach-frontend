import { useState } from "react";
import axios from "axios";

function ImproveResume() {
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");

  const improve = async () => {
    const res = await axios.post("https://ai-career-coach-backend-ye2g.onrender.com/improve-resume/", {
      resume_text: text
    });

    setOutput(res.data.improved_resume);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>✍️ AI Resume Improver</h2>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: "100%", height: "200px" }}
      />

      <button onClick={improve}>🚀 Improve</button>

      {output && (
        <div style={{ marginTop: "20px" }}>
          <h3>✨ Improved Resume</h3>
          <pre>{output}</pre>
        </div>
      )}
    </div>
  );
}

export default ImproveResume;
