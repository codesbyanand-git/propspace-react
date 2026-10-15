import './PropertyFilters.css'

function PropertyFilters({ filters, setFilters, onReset, totalCount, filteredCount }) {
  const handleChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="filters-container">
      {/* Top Header / Purpose Tabs */}
      <div className="filters-header">
        <div className="purpose-pill-group">
          <button
            type="button"
            className={`purpose-pill ${filters.purpose === 'all' ? 'active' : ''}`}
            onClick={() => handleChange('purpose', 'all')}
          >
            All Properties
          </button>
          <button
            type="button"
            className={`purpose-pill ${filters.purpose === 'buy' ? 'active' : ''}`}
            onClick={() => handleChange('purpose', 'buy')}
          >
            For Sale
          </button>
          <button
            type="button"
            className={`purpose-pill ${filters.purpose === 'rent' ? 'active' : ''}`}
            onClick={() => handleChange('purpose', 'rent')}
          >
            For Rent
          </button>
        </div>

        <div className="results-counter">
          Showing <strong>{filteredCount}</strong> of {totalCount} properties
        </div>
      </div>

      {/* Main Filter Controls Grid */}
      <div className="filters-grid">
        {/* Location Search Input */}
        <div className="filter-item">
          <label htmlFor="filter-location">Location / Keyword</label>
          <div className="input-with-icon">
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
            <input
              id="filter-location"
              type="text"
              placeholder="City, state, or neighborhood..."
              value={filters.location}
              onChange={(e) => handleChange('location', e.target.value)}
            />
          </div>
        </div>

        {/* Property Type Dropdown */}
        <div className="filter-item">
          <label htmlFor="filter-type">Property Type</label>
          <select
            id="filter-type"
            value={filters.type}
            onChange={(e) => handleChange('type', e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Villa">Villa</option>
          </select>
        </div>

        {/* Minimum Price */}
        <div className="filter-item">
          <label htmlFor="filter-min-price">Min Price ($)</label>
          <input
            id="filter-min-price"
            type="number"
            min="0"
            step="1000"
            placeholder="Min price"
            value={filters.minPrice}
            onChange={(e) => handleChange('minPrice', e.target.value)}
          />
        </div>

        {/* Maximum Price */}
        <div className="filter-item">
          <label htmlFor="filter-max-price">Max Price ($)</label>
          <input
            id="filter-max-price"
            type="number"
            min="0"
            step="1000"
            placeholder="Max price"
            value={filters.maxPrice}
            onChange={(e) => handleChange('maxPrice', e.target.value)}
          />
        </div>

        {/* Bedrooms Dropdown */}
        <div className="filter-item">
          <label htmlFor="filter-bedrooms">Bedrooms</label>
          <select
            id="filter-bedrooms"
            value={filters.bedrooms}
            onChange={(e) => handleChange('bedrooms', e.target.value)}
          >
            <option value="all">Any Bedrooms</option>
            <option value="1">1+ Bedrooms</option>
            <option value="2">2+ Bedrooms</option>
            <option value="3">3+ Bedrooms</option>
            <option value="4">4+ Bedrooms</option>
            <option value="5">5+ Bedrooms</option>
          </select>
        </div>

        {/* Sorting Dropdown */}
        <div className="filter-item">
          <label htmlFor="filter-sort">Sort By</label>
          <select
            id="filter-sort"
            value={filters.sortBy}
            onChange={(e) => handleChange('sortBy', e.target.value)}
          >
            <option value="default">Default / Recommended</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="newest">Newest First</option>
          </select>
        </div>
      </div>

      {/* Footer / Reset Action */}
      <div className="filters-footer">
        <button type="button" className="btn-clear-all" onClick={onReset}>
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
          Reset All Filters
        </button>
      </div>
    </div>
  )
}

export default PropertyFilters
