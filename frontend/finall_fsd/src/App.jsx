import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from "./components/Footer";

import Home from './components/Home';
import Collaborators from './components/collaborators';
import Mentors from './components/mentors';
import VideoGallery from './components/videos';
import SDGProjects from './pages/SDGProjects';
import { sampleProjects } from './data/sampleProjects';
import AuthPage from './components/Auth';
import ProjectsSDG from './pages/projects';

// Import new components
import StudentDashboard from './components/StudentDashboard';
import MentorDashboard from './components/MentorDashboard';
import CollaboratorDashboard from './components/CollaboratorDashboard';
import AdminDashboard from './components/AdminDashboard';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/collaborators" element={<Collaborators />} />
            <Route path="/mentors" element={<Mentors />} />
            <Route path="/sdg/:sdgNumber" element={<SDGProjects projects={sampleProjects} />} />
            <Route path="/media/videos" element={<VideoGallery />} />
            <Route path="/projects" element={<ProjectsSDG />} />

            {/* Unprotected Routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/mentor/dashboard" element={<MentorDashboard />} />
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/collaborator/dashboard" element={<CollaboratorDashboard />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;