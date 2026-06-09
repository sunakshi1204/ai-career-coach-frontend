import { useState } from "react";
import axios from "axios";
import "./JobMatcher.css";

type JobType = {
  id: number;
  title: string;
  company?: string;
  location?: string;
  job_type?: string;
  experience?: string;

  match_score: number;
  matched_skills: string[];
  missing_skills: string[];
};

function JobMatcher() {
  const [skills, setSkills] = useState("");
  const [jobs, setJobs] = useState<JobType[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [resume, setResume] = useState<File | null>(null);

  const matchJobs = async () => {
    if (!skills.trim()) {
      alert("Enter at least one skill");
      return;
    }

    setLoading(true);
    setSearched(true);

    try {
      const res = await axios.post("http://127.0.0.1:8000/jobs-match/", {
        skills: skills.toLowerCase().split(/[\s,]+/),
      });

      setJobs(res.data.job_matches || []);
    } catch (err) {
      handleError(err);
    }

    setLoading(false);
  };

  const uploadResume = async () => {
    if (!resume) return alert("Select resume");

    const formData = new FormData();
    formData.append("resume", resume);

    setLoading(true);
    setSearched(true);

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/analyze-resume/",
        formData
      );

      setJobs(res.data.job_matches || []);
      setSkills(res.data.skills?.join(", ") || "");
    } catch (err) {
      handleError(err);
    }

    setLoading(false);
  };

  const fetchJobDetail = async (id: number) => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/job/${id}/`);
      setSelectedJob(res.data);
    } catch {
      alert("Failed to load job detail");
    }
  };

  const handleError = (err: any) => {
    console.error(err);
    if (err?.response) alert(err.response.data?.error);
    else alert("Backend not running ");
  };

  return (
    <div className="container">
      <h2 className="heading">💼 Job Matcher</h2>

      {/* INPUT */}
      <input
        className="input"
        placeholder="Enter skills"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && matchJobs()}
      />

      <button className="btn btn-primary" onClick={matchJobs}>
         Match
      </button>

      {/* RESUME */}
      <div>
        <input
          className="file-input"
          type="file"
          onChange={(e) => setResume(e.target.files?.[0] || null)}
        />
        <button className="btn btn-green" onClick={uploadResume}>
          📄 Upload Resume
        </button>
      </div>

      {/* LOADING */}
      {loading && <p>Loading...</p>}

      {/* NO RESULT */}
      {searched && !loading && jobs.length === 0 && <p>No jobs found</p>}

      {/* JOB LIST */}
      {jobs.map((job) => (
        <div
          key={job.id}
          onClick={() => fetchJobDetail(job.id)}
          className="job-card"
        >
          <h3>{job.title}</h3>
          <p>{job.company} | {job.location}</p>
          <p className="score">Score: {job.match_score}%</p>
        </div>
      ))}

      {/* DETAIL VIEW */}
      {selectedJob && (
        <div className="detail-box">
          <h2>{selectedJob.title}</h2>

          <p> {selectedJob.company}</p>
          <p> {selectedJob.location}</p>
          <p> {selectedJob.job_type}</p>
          <p> {selectedJob.experience}</p>

          <p>
             Salary: {selectedJob.salary_min} - {selectedJob.salary_max}
          </p>

          <p>{selectedJob.description}</p>

          <p> Skills: {selectedJob.skills?.join(", ")}</p>

          <button
            className="btn btn-green"
            onClick={() => alert("Applied Successfully ")}
          >
             Apply Now
          </button>

          <button
            className="btn btn-close"
            onClick={() => setSelectedJob(null)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default JobMatcher;