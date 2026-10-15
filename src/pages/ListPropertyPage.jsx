import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import PropertyForm from '../components/PropertyForm'
import { useProperties } from '../context/useProperties'
import './ListPropertyPage.css'

function ListPropertyPage() {
  const { addProperty } = useProperties()
  const navigate = useNavigate()
  const [createdProperty, setCreatedProperty] = useState(null)

  const handleFormSubmit = (data) => {
    const newProperty = addProperty(data)
    setCreatedProperty(newProperty)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="list-property-page">
      <div className="list-header-banner">
        <div className="list-container">
          <span className="badge-banner">Owner & Agent Portal</span>
          <h1 className="list-page-title">List Your Property on PropSpace</h1>
          <p className="list-page-subtitle">
            Publish your home, luxury apartment, or villa to connect with verified buyers
            and high-intent renters.
          </p>
        </div>
      </div>

      <div className="list-container main-form-wrapper">
        {createdProperty ? (
          <div className="submission-success-card">
            <div className="success-badge-icon">✓</div>
            <h2>Property Successfully Listed!</h2>
            <p className="success-lead">
              <strong>"{createdProperty.title}"</strong> has been added to your local
              PropSpace listings catalog.
            </p>
            <div className="success-demo-callout">
              <p>
                <strong>ℹ️ Client-Side Session Demo:</strong> This listing is stored in
                your active browser state & local storage. It is immediately visible on the
                Properties catalog and your Manage Listings dashboard. (Not saved to an external database).
              </p>
            </div>
            <div className="success-actions">
              <Link
                to={`/properties/${createdProperty.id}`}
                className="btn-success-primary"
              >
                View Property Page →
              </Link>
              <Link to="/manage-listings" className="btn-success-secondary">
                Go to Manage Listings
              </Link>
              <button
                type="button"
                className="btn-success-outline"
                onClick={() => setCreatedProperty(null)}
              >
                + List Another Property
              </button>
            </div>
          </div>
        ) : (
          <div className="form-layout-wrapper">
            <div className="form-info-sidebar">
              <div className="info-card">
                <h3>Why List on PropSpace?</h3>
                <ul className="info-points">
                  <li>
                    <strong>Instant Visibility:</strong> Your listing is immediately
                    searchable across all filters.
                  </li>
                  <li>
                    <strong>Rich Media Showcase:</strong> Add photos and detailed
                    amenity tags to attract genuine prospects.
                  </li>
                  <li>
                    <strong>No Middlemen Fees:</strong> Direct buyer and tenant
                    communication without hidden platform deductions.
                  </li>
                </ul>
              </div>

              <div className="info-card tip-card">
                <h4>💡 Tips for a Great Listing</h4>
                <p>
                  Properties with accurate square footage, clear descriptions of
                  recent renovations, and verified addresses receive over 3x more inquiries.
                </p>
              </div>
            </div>

            <div className="form-card-column">
              <PropertyForm
                onSubmit={handleFormSubmit}
                onCancel={() => navigate('/manage-listings')}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ListPropertyPage
