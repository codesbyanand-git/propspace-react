import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useProperties } from '../context/useProperties'
import { FALLBACK_PROPERTY_IMAGE } from '../data/sampleProperties'
import './PropertyDetailsPage.css'

function PropertyDetailsPage() {
  const { id } = useParams()
  const { getPropertyById } = useProperties()
  const property = getPropertyById(id)

  const [activeImageIndex, setActiveImageIndex] = useState(0)

  // Express Interest Form state
  const [inquiry, setInquiry] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [formErrors, setFormErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  if (!property) {
    return (
      <div className="property-not-found-container">
        <div className="not-found-card">
          <h2>Property Not Found</h2>
          <p>The property listing you are looking for does not exist or has been removed.</p>
          <Link to="/properties" className="btn-back-properties">
            ← Browse All Properties
          </Link>
        </div>
      </div>
    )
  }

  const galleryImages =
    property.images && property.images.length > 0
      ? property.images
      : [property.image || FALLBACK_PROPERTY_IMAGE]

  const formatPrice = (price, purpose) => {
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price)

    return purpose === 'rent' ? `${formatted} / month` : formatted
  }

  // Handle form changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setInquiry((prev) => ({ ...prev, [name]: value }))
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  // Validate and submit inquiry
  const handleInquirySubmit = (e) => {
    e.preventDefault()
    const errors = {}

    if (!inquiry.name.trim()) {
      errors.name = 'Please enter your full name.'
    }

    if (!inquiry.email.trim()) {
      errors.email = 'Please enter your email address.'
    } else if (!/\S+@\S+\.\S+/.test(inquiry.email)) {
      errors.email = 'Please provide a valid email address.'
    }

    if (!inquiry.phone.trim()) {
      errors.phone = 'Please enter your phone number.'
    } else if (inquiry.phone.trim().length < 8) {
      errors.phone = 'Please enter a valid phone number.'
    }

    if (!inquiry.message.trim()) {
      errors.message = 'Please include a brief message or question.'
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    setIsSubmitted(true)
  }

  const handleResetInquiry = () => {
    setIsSubmitted(false)
    setInquiry({
      name: '',
      email: '',
      phone: '',
      message: ''
    })
  }

  return (
    <div className="property-details-page">
      {/* Breadcrumb Navigation */}
      <div className="breadcrumb-bar">
        <div className="details-container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="crumb-sep">/</span>
            <Link to={`/properties?purpose=${property.purpose}`}>
              {property.purpose === 'buy' ? 'Buy' : 'Rent'}
            </Link>
            <span className="crumb-sep">/</span>
            <span className="current-crumb">{property.title}</span>
          </nav>
        </div>
      </div>

      <div className="details-container page-layout">
        {/* Left Column: Property Overview & Gallery */}
        <div className="details-main-col">
          {/* Top Title & Price Bar */}
          <div className="property-header">
            <div className="header-tags">
              <span className={`tag-purpose ${property.purpose}`}>
                {property.purpose === 'buy' ? 'For Sale' : 'For Rent'}
              </span>
              <span className="tag-type">{property.type}</span>
              {property.city && <span className="tag-city">{property.city}</span>}
            </div>

            <h1 className="property-title">{property.title}</h1>

            <div className="property-location-line">
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>{property.location}</span>
            </div>

            <div className="property-price-display">
              {formatPrice(property.price, property.purpose)}
            </div>
          </div>

          {/* Image Gallery */}
          <div className="gallery-section">
            <div className="main-image-wrap">
              <img
                src={galleryImages[activeImageIndex] || FALLBACK_PROPERTY_IMAGE}
                alt={property.title}
                className="main-gallery-img"
              />
            </div>

            {galleryImages.length > 1 && (
              <div className="thumbnail-row">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`thumb-btn ${activeImageIndex === idx ? 'active' : ''}`}
                    onClick={() => setActiveImageIndex(idx)}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Key Specifications Grid */}
          <div className="specs-card">
            <h2 className="specs-card-title">Key Specifications</h2>
            <div className="specs-grid">
              <div className="spec-box">
                <span className="spec-label">Bedrooms</span>
                <strong className="spec-value">{property.bedrooms} Beds</strong>
              </div>
              <div className="spec-box">
                <span className="spec-label">Bathrooms</span>
                <strong className="spec-value">{property.bathrooms} Baths</strong>
              </div>
              <div className="spec-box">
                <span className="spec-label">Area</span>
                <strong className="spec-value">
                  {Number(property.area).toLocaleString()} sqft
                </strong>
              </div>
              <div className="spec-box">
                <span className="spec-label">Furnishing</span>
                <strong className="spec-value">{property.furnishing}</strong>
              </div>
              <div className="spec-box">
                <span className="spec-label">Parking</span>
                <strong className="spec-value">{property.parking}</strong>
              </div>
              <div className="spec-box">
                <span className="spec-label">Listing ID</span>
                <strong className="spec-value">{property.id}</strong>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="content-card">
            <h2>About This Property</h2>
            <p className="property-description-text">{property.description}</p>
          </div>

          {/* Amenities Checklist */}
          {property.amenities && property.amenities.length > 0 && (
            <div className="content-card">
              <h2>Features & Amenities</h2>
              <div className="amenities-list-grid">
                {property.amenities.map((amenity, idx) => (
                  <div key={idx} className="amenity-pill">
                    <svg
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                      fill="none"
                      stroke="#059669"
                      strokeWidth="2.5"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Express Interest Form Card */}
        <div className="details-sidebar">
          <div className="inquiry-card">
            <h3>Express Interest</h3>
            <p className="inquiry-subtitle">
              Interested in touring or inquiring about this property? Send a direct
              message to our representative.
            </p>

            {isSubmitted ? (
              <div className="inquiry-success-box">
                <div className="success-icon">✓</div>
                <h4>Thank You, {inquiry.name}!</h4>
                <p>
                  Your message of interest has been received. Our listing
                  representative will reach out to you via <strong>{inquiry.email}</strong> shortly.
                </p>
                <div className="demo-notice">
                  * Note: In this demonstration build, your inquiry is validated on the
                  client-side and has not been saved to a backend database.
                </div>
                <button
                  type="button"
                  className="btn-send-another"
                  onClick={handleResetInquiry}
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} noValidate className="inquiry-form">
                <div className="form-group">
                  <label htmlFor="inq-name">
                    Full Name <span className="required">*</span>
                  </label>
                  <input
                    id="inq-name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    value={inquiry.name}
                    onChange={handleInputChange}
                    className={formErrors.name ? 'has-error' : ''}
                  />
                  {formErrors.name && (
                    <span className="error-text">{formErrors.name}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="inq-email">
                    Email Address <span className="required">*</span>
                  </label>
                  <input
                    id="inq-email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    value={inquiry.email}
                    onChange={handleInputChange}
                    className={formErrors.email ? 'has-error' : ''}
                  />
                  {formErrors.email && (
                    <span className="error-text">{formErrors.email}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="inq-phone">
                    Phone Number <span className="required">*</span>
                  </label>
                  <input
                    id="inq-phone"
                    name="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={inquiry.phone}
                    onChange={handleInputChange}
                    className={formErrors.phone ? 'has-error' : ''}
                  />
                  {formErrors.phone && (
                    <span className="error-text">{formErrors.phone}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="inq-message">
                    Message <span className="required">*</span>
                  </label>
                  <textarea
                    id="inq-message"
                    name="message"
                    rows="4"
                    placeholder={`Hi, I am interested in ${property.title}. Please provide more information about scheduling a viewing.`}
                    value={inquiry.message}
                    onChange={handleInputChange}
                    className={formErrors.message ? 'has-error' : ''}
                  ></textarea>
                  {formErrors.message && (
                    <span className="error-text">{formErrors.message}</span>
                  )}
                </div>

                <button type="submit" className="btn-inquiry-submit">
                  Send Inquiry
                </button>
              </form>
            )}

            <div className="inquiry-footer-trust">
              <span>🔒 100% Privacy Protected</span>
              <span>⚡ Fast Response Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyDetailsPage
