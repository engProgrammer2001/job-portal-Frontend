import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer className="bg-[#282828] text-white p-8">
        <div className="container mx-auto flex flex-col md:flex-row justify-between">
          <div className="flex flex-col mb-4">
            <h5 className="font-semibold mb-2">For Candidates</h5>
            <ul>
              <li>
                <Link
                  to="/browse-jobs"
                  className="text-muted-foreground hover:text-muted"
                >
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link
                  to="/browse-categories"
                  className="text-muted-foreground hover:text-muted"
                >
                  Browse Categories
                </Link>
              </li>
              <li>
                <Link
                  to="/candidate-dashboard"
                  className="text-muted-foreground hover:text-muted"
                >
                  Candidate Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/job-alerts"
                  className="text-muted-foreground hover:text-muted"
                >
                  Job Alerts
                </Link>
              </li>
              <li>
                <Link
                  to="/bookmarks"
                  className="text-muted-foreground hover:text-muted"
                >
                  My Bookmarks
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col mb-4">
            <h5 className="font-semibold mb-2">For Employers</h5>
            <ul>
              <li>
                <Link
                  to="/browse-candidates"
                  className="text-muted-foreground hover:text-muted"
                >
                  Browse Candidates
                </Link>
              </li>
              <li>
                <Link
                  to="/employer-dashboard"
                  className="text-muted-foreground hover:text-muted"
                >
                  Employer Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/add-job"
                  className="text-muted-foreground hover:text-muted"
                >
                  Add Job
                </Link>
              </li>
              <li>
                <Link
                  to="/job-packages"
                  className="text-muted-foreground hover:text-muted"
                >
                  Job Packages
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col mb-4">
            <h5 className="font-semibold mb-2">Other</h5>
            <ul>
              <li>
                <Link
                  to="/job-page"
                  className="text-muted-foreground hover:text-muted"
                >
                  Job Page
                </Link>
              </li>
              <li>
                <Link
                  to="/resume-page"
                  className="text-muted-foreground hover:text-muted"
                >
                  Resume Page
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-muted-foreground hover:text-muted"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-muted-foreground hover:text-muted"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col mb-4">
            <h5 className="font-semibold mb-2">Legal</h5>
            <ul>
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-muted-foreground hover:text-muted"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-of-use"
                  className="text-muted-foreground hover:text-muted"
                >
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-muted-foreground hover:text-muted"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-8">
          <span className="text-muted-foreground">
            © Theme by Sripublications.net. All Rights Reserved.
          </span>
        </div>
        
      </footer>
    </div>
  );
};

export default Footer;
