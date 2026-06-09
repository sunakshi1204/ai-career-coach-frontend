import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Interview from "./pages/Interview";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetSuccess from "./pages/password_reset_complete";
import ResetPassword from "./pages/password_reset_confirm";
import ResetEmailSent from "./pages/password_reset_done";
import ForgotPassword from "./pages/password_reset";
import Profile from "./pages/Profile";
import Fields from "./pages/Fields";
import CategorySelect from "./pages/CategorySelect";
import JobMatcher from "./pages/JobMatcher";
import ImproveResume from "./pages/ImproveResume";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Dashboard />} />
       
<Route path="/dashboard" element={<Dashboard />} /> 

        {/* ✅ FIELD SELECT */}
        <Route path="/fields" element={<Fields />} />

        {/* ✅ CATEGORY SELECT */}
        <Route path="/categories/:id" element={<CategorySelect />} />

        {/* ✅ FINAL INTERVIEW ROUTE */}
       <Route path="/interview/:fieldId/:categoryId" element={<Interview />} />
        {/* AUTH ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-sent" element={<ResetEmailSent />} />
        <Route path="/reset/:uid/:token" element={<ResetPassword />} />
        <Route path="/reset-success" element={<ResetSuccess />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/resume" element={<ResumeAnalyzer />} />
        <Route path="/improve" element={<ImproveResume />} />

      <Route path="/job-matcher" element={<JobMatcher />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
