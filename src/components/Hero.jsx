import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Hero.css'

function Hero() {
  const [activeTab, setActiveTab] = useState('buy')
  const [searchLocation, setSearchLocation] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()

    const params = new URLSearchParams()
    if (activeTab && activeTab !== 'all') {
      params.set('purpose', activeTab)
    }
    if (searchLocation.trim()) {
      params.set('location', searchLocation.trim())
    }

    const query = params.toString()
    navigate(query ? `/properties?${query}` : '/properties')
  }

  return (
    <section className="hero-section">
      <div className="hero-container">
        {/* Brand Tagline Badge */}
        <div className="hero-badge">
          <span className="badge-dot"></span>
          <span>Your Trusted Real Estate Partner</span>
        </div>

        {/* Hero Headline */}
        <h1 className="hero-headline">
          Find Your Perfect Place to Live with{' '}
          <span className="highlight-text">PropSpace</span>
        </h1>

        {/* Short Description */}
        <p className="hero-description">
          Discover verified homes, luxury apartments, and commercial spaces
          for sale and rent across prime neighborhoods.
        </p>

        {/* Search Card Container */}
        <div className="search-card">
          {/* Buy / Rent Selector */}
          <div className="tab-group">
            <button
              type="button"
              className={`tab-btn ${activeTab === 'buy' ? 'active' : ''}`}
              onClick={() => setActiveTab('buy')}
            >
              Buy Property
            </button>
            <button
              type="button"
              className={`tab-btn ${activeTab === 'rent' ? 'active' : ''}`}
              onClick={() => setActiveTab('rent')}
            >
              Rent Property
            </button>
          </div>

          {/* Location Search Form */}
          <form className="search-form" onSubmit={handleSearch}>
            <div className="input-wrapper">
              <svg
                className="input-icon"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <input
                type="text"
                className="search-input"
                placeholder={
                  activeTab === 'buy'
                    ? 'Enter city, neighborhood, or address to buy (e.g. Seattle, Miami)...'
                    : 'Enter city, neighborhood, or address to rent (e.g. New York, Austin)...'
                }
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
              />
            </div>

            <button type="submit" className="search-btn">
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <span>Search</span>
            </button>
          </form>

          {/* Quick Statistics */}
          <div className="hero-quick-stats">
            <div className="stat-item">
              <strong>12,000+</strong>
              <span>Verified Properties</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <strong>40+</strong>
              <span>Major Cities</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <strong>100%</strong>
              <span>Direct Listings</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
