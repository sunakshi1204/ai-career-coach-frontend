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
      const res = await axios.post(
        "https://ai-career-coach-backend-ye2g.onrender.com/jobs-match/",
        {
          skills: skills.toLowerCase().split(/[\s,]+/),
        }
      );

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
        "https://ai-career-coach-backend-ye2g.onrender.com/analyze-resume/",
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
      const res = await axios.get(
        `https://ai-career-coach-backend-ye2g.onrender.com/job/${id}/`
      );

      setSelectedJob(res.data);
    } catch {
      alert("Failed to load job detail");
    }
  };

  const handleError = (err: any) => {
    console.error(err);

    if (err?.response) {
      alert(err.response.data?.error);
    } else {
      alert("Backend not running");
    }
  };

  return (
    <div className="container">
      {/* HERO SECTION */}
      <div className="hero">
        <h1 className="heading"> AI Job Matcher</h1>
        <p className="subtitle">
          Match your skills with the best jobs instantly
        </p>
      </div>

      {/* SEARCH BOX */}
      <div className="search-card">
        <input
          className="input"
          placeholder="Enter skills (React, Python, Django...)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && matchJobs()}
        />

        <button className="btn btn-primary" onClick={matchJobs}>
          🔍 Match Jobs
        </button>
      </div>

      {/* RESUME */}
      <div className="resume-card">
        <h3> Resume Matching</h3>

        <input
          className="file-input"
          type="file"
          onChange={(e) => setResume(e.target.files?.[0] || null)}
        />

        <button className="btn btn-green" onClick={uploadResume}>
          Upload Resume
        </button>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="loading-box">
          <div className="loader"></div>
          <p>Finding best jobs for you...</p>
        </div>
      )}

      {/* NO JOBS */}
      {searched && !loading && jobs.length === 0 && (
        <div className="empty-state">
          <h3> No Jobs Found</h3>
          <p>Try adding more skills.</p>
        </div>
      )}

      {/* JOBS COUNT */}
      {jobs.length > 0 && (
        <div className="result-header">
          <h3> {jobs.length} Matching Jobs Found</h3>
        </div>
      )}

      {/* JOB LIST */}
      <div className="jobs-grid">
        {jobs.map((job) => (
          <div
            key={job.id}
            onClick={() => fetchJobDetail(job.id)}
            className="job-card"
          >
            <div className="job-top">
              <div>
                <h3>{job.title}</h3>

                <p className="company">
                   {job.company || "Unknown Company"}
                </p>

                <p className="location">
                   {job.location || "Remote"}
                </p>
              </div>

              <div className="score-circle">
                {job.match_score}%
              </div>
            </div>

            <div className="skills-wrapper">
              {job.matched_skills?.slice(0, 4).map((skill, index) => (
                <span key={index} className="skill-chip">
                  {skill}
                </span>
              ))}
            </div>

            <button className="view-btn">
              View Details →
            </button>
          </div>
        ))}
      </div>

      {/* JOB DETAIL MODAL */}
      {selectedJob && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedJob(null)}
        >
          <div
            className="detail-box"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="detail-header">
              <h2>{selectedJob.title}</h2>

              <button
                className="close-btn"
                onClick={() => setSelectedJob(null)}
              >
                ✕
              </button>
            </div>

            <div className="meta-grid">
              <div className="meta-item">
                 {selectedJob.company}
              </div>

              <div className="meta-item">
                 {selectedJob.location}
              </div>

              <div className="meta-item">
                 {selectedJob.job_type}
              </div>

              <div className="meta-item">
                 {selectedJob.experience}
              </div>
            </div>

            <div className="salary-box">
               ₹{selectedJob.salary_min?.toLocaleString()} -
              ₹{selectedJob.salary_max?.toLocaleString()}
            </div>

            <div className="section">
              <h4> Description</h4>
              <p>{selectedJob.description}</p>
            </div>

            <div className="section">
              <h4>🛠 Required Skills</h4>

              <div className="skills-wrapper">
                {selectedJob.skills?.map(
                  (skill: string, index: number) => (
                    <span key={index} className="skill-chip">
                      {skill}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="button-row">
              <button
                className="btn btn-primary"
                onClick={() =>
                  alert("Applied Successfully ")
                }
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
          </div>
        </div>
      )}
    </div>
  );
}

export default JobMatcher;