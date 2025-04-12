import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from "./components/Footer";

import Home from './components/Home';
import Collaborators from './components/collaborators';
import Mentors from './components/mentors';

import SDGProjects from './pages/SDGProjects';
import { sampleProjects } from './data/sampleProjects';
// import ProjectsSDG from './components/ProjectDetails';
// import './styles/global.css';
import AuthPage from './components/Auth';

function App() {
  return (
    <Router>
      {/* Make this a flex container */}
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        {/* Main content should take remaining space */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/collaborators" element={<Collaborators />} />
            <Route path="/mentors" element={<Mentors />} />
            <Route path="/" element={<Home projects={sampleProjects} />} />
            <Route path="/sdg/:sdgNumber" element={<SDGProjects projects={sampleProjects} />} />
            {/* <Route path="/projects/sdg-:id" element={<ProjectsSDG />} /> */}
            {/* <Route path="/media/videos" element={<Videos />} /> */}
            {/* <Route path="/media/gallery" element={<Gallery />} /> */}
            {/* <Route path="/contact" element={<Contact />} /> */}
          </Routes>
        </div>

        {/* Footer at the bottom */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
