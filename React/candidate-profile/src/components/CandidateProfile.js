import React from 'react';
import { Link } from 'react-router-dom';

function CandidateProfile() {
  return (
    <div>
      <h2>Candidate Profile</h2>
      {/* Add candidate profile picture here */}
      <div>
        <img src="/path/to/profile-picture.jpg" alt="Candidate Profile" />
      </div>
      {/* Candidate personal details */}
      <div>
        <h3>Personal Details</h3>
        {/* Add candidate personal details here */}
        <p>Name: John Doe</p>
        <p>Email: john.doe@example.com</p>
        <p>Phone: (123) 456-7890</p>
      </div>
      {/* Candidate education */}
      <div>
        <h3>Education</h3>
        {/* Add candidate education details here */}
        <p>University: Example University</p>
        <p>Degree: Bachelor's in Computer Science</p>
        <p>Year of Graduation: 2022</p>
      </div>
      {/* Candidate experience */}
      <div>
        <h3>Experience</h3>
        {/* Add candidate experience details here */}
        <p>Company: Example Company</p>
        <p>Position: Software Engineer</p>
        <p>Duration: 2019 - Present</p>
      </div>
      {/* Candidate skills */}
      <div>
        <h3>Skills</h3>
        {/* Add candidate skills here */}
        <ul>
          <li>JavaScript</li>
          <li>React</li>
          <li>Node.js</li>
          {/* Add more skills as needed */}
        </ul>
      </div>
      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default CandidateProfile;
