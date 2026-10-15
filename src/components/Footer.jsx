import { Link } from 'react-router-dom'
import './Footer.css'

const CURRENT_YEAR = 2026

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        {/* Brand Column */}
        <div className="footer-col brand-col">
          <Link to="/" className="footer-brand">
            <div className="footer-brand-icon">
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <span className="footer-brand-name">
              Prop<span className="brand-accent">Space</span>
            </span>
          </Link>
          <p className="footer-description">
            Your trusted real-estate marketplace for modern living. Discover,
            buy, rent, and list verified properties across premier cities with
            ease and transparency.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h4 className="footer-heading">Navigation</h4>
          <ul className="footer-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/properties?purpose=buy">Properties for Sale</Link>
            </li>
            <li>
              <Link to="/properties?purpose=rent">Properties for Rent</Link>
            </li>
            <li>
              <Link to="/list-property">List a Property</Link>
            </li>
            <li>
              <Link to="/manage-listings">Manage Listings</Link>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div className="footer-col">
          <h4 className="footer-heading">Categories</h4>
          <ul className="footer-links">
            <li>
              <Link to="/properties?type=Apartment">Luxury Apartments</Link>
            </li>
            <li>
              <Link to="/properties?type=House">Family Houses</Link>
            </li>
            <li>
              <Link to="/properties?type=Villa">Modern Villas</Link>
            </li>
            <li>
              <Link to="/properties?purpose=buy&type=Villa">Waterfront Villas</Link>
            </li>
            <li>
              <Link to="/properties?purpose=rent&type=Apartment">City Lofts</Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-col">
          <h4 className="footer-heading">Contact PropSpace</h4>
          <ul className="footer-contact-list">
            <li>
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>100 Innovation Way, Suite 400, Miami, FL</span>
            </li>
            <li>
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <a href="tel:+18005550199">+1 (800) 555-0199</a>
            </li>
            <li>
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <a href="mailto:support@propspace.demo">support@propspace.demo</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p>© {CURRENT_YEAR} PropSpace Real Estate Portal. All rights reserved.</p>
          <div className="footer-demo-badge">
            Frontend Demonstration Mode (Client-side Data)
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
