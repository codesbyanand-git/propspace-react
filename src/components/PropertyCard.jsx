import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FALLBACK_PROPERTY_IMAGE } from '../data/sampleProperties'
import './PropertyCard.css'

function PropertyCard({ property }) {
  const [imgSrc, setImgSrc] = useState(property.image || FALLBACK_PROPERTY_IMAGE)

  const formatPrice = (price, purpose) => {
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price)

    return purpose === 'rent' ? `${formatted} / mo` : formatted
  }

  return (
    <article className="property-card">
      {/* Image & Badges */}
      <div className="card-image-wrap">
        <img
          src={imgSrc}
          alt={property.title}
          className="card-image"
          loading="lazy"
          onError={() => setImgSrc(FALLBACK_PROPERTY_IMAGE)}
        />
        <div className="card-badges">
          <span className={`badge-purpose ${property.purpose}`}>
            {property.purpose === 'buy' ? 'For Sale' : 'For Rent'}
          </span>
          <span className="badge-type">{property.type}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="card-body">
        <div className="card-price">
          {formatPrice(property.price, property.purpose)}
        </div>

        <h3 className="card-title">
          <Link to={`/properties/${property.id}`} title={property.title}>
            {property.title}
          </Link>
        </h3>

        <div className="card-location">
          <svg
            className="pin-icon"
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span>{property.location}</span>
        </div>

        {/* Specs */}
        <div className="card-specs">
          <div className="spec-item" title="Bedrooms">
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9" />
            </svg>
            <span>{property.bedrooms} Beds</span>
          </div>

          <div className="spec-item" title="Bathrooms">
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 12v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6" />
              <path d="M6 12V5a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v7" />
            </svg>
            <span>{property.bathrooms} Baths</span>
          </div>

          <div className="spec-item" title="Area">
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9h18M9 21V9" />
            </svg>
            <span>{Number(property.area).toLocaleString()} sqft</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="card-footer">
          <Link to={`/properties/${property.id}`} className="card-view-btn">
            View Details
          </Link>
        </div>
      </div>
    </article>
  )
}

export default PropertyCard
