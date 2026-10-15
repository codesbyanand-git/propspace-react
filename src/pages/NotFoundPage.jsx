import { Link } from 'react-router-dom'
import './NotFoundPage.css'

function NotFoundPage() {
  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <span className="not-found-code">404</span>
        <h1>Page Not Found</h1>
        <p>
          The property, listing, or page you are looking for doesn't exist or has
          been moved.
        </p>
        <div className="not-found-actions">
          <Link to="/" className="btn-return-home">
            Return to Homepage
          </Link>
          <Link to="/properties" className="btn-browse-props">
            Browse All Properties
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
