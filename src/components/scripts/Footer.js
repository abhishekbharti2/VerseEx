import React from 'react';
import '../styles/Footer.css';

export default function Footer() {
  return (
    <footer className="verseex-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-title">VERSE-EX</h3>
          <p className="footer-description">
            High impact blog posts and information<br />
            Virtually connect with Universe in our events<br />
            Join a helpful community of Verse-EX
          </p>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">ABOUT</h3>
          <p className="footer-description">
            Verse-EX is a learning platform<br />
            Here you can learn Cosmology & research<br />
            We provide latest information about space<br />
            All information is collected from NASA
          </p>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">DEVELOPER TEAM</h3>
          <p className="footer-contact">
            <span className="fa">&#xf0e0;</span> verseex@gmail.com
          </p>
          <p className="footer-dev">
            Developer: <a href="https://bhartiabhi.netlify.app" className="dev-link">Abhishek Bharti</a>
          </p>
        </div>
      </div>

      <div className="social-divider">
        <span className="social-title">Our Social Media Handles</span>
      </div>

      <div className="social-media">
        <a href="https://www.facebook.com/profile.php?id=100027548940668" className="social-icon fa fa-facebook"> </a>
        <a href="/" className="social-icon fa fa-twitter"> </a>
        <a href="/" className="social-icon fa fa-instagram"> </a>
        <a href="https://www.youtube.com/@verseex" className="social-icon fa fa-youtube"> </a>
      </div>

      <div className="copyright">
        &copy; www.verse-ex.in || All Rights Reserved
      </div>
    </footer>
  );
}