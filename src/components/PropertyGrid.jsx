import PropertyCard from './PropertyCard'
import './PropertyGrid.css'

function PropertyGrid({ properties, emptyMessage, onResetFilters }) {
  if (!properties || properties.length === 0) {
    return (
      <div className="empty-properties-state">
        <div className="empty-icon-wrap">
          <svg
            viewBox="0 0 24 24"
            width="44"
            height="44"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        </div>
        <h3>No Properties Found</h3>
        <p>
          {emptyMessage ||
            'We couldn’t find any properties matching your current criteria. Try adjusting your filters or search terms.'}
        </p>
        {onResetFilters && (
          <button type="button" className="btn-reset-filters" onClick={onResetFilters}>
            Clear All Filters
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="property-grid">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  )
}

export default PropertyGrid
