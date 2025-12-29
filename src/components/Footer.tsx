import "./Footer.css";
import { Github, Linkedin, Mail } from "lucide-react";

function Footer() {
  return (
    <footer className="footer">
      {/* Left group */}
      <div className="footer-left-group">
        <span className="footer-text">Get in touch</span>

        <div className="footer-center">
          <a href="#" className="social-icon">
            <Linkedin size={14} />
          </a>
          <a href="#" className="social-icon">
            <Github size={14} />
          </a>
          <a href="#" className="social-icon">
            <Mail size={14} />
          </a>
        </div>
      </div>

      {/* Right */}
      <div className="footer-right">
        <a href="#">Home page</a>
      </div>
    </footer>
  );
}

export default Footer;
