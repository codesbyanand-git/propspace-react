import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import PropertyGrid from '../components/PropertyGrid'
import { useProperties } from '../context/useProperties'
import './HomePage.css'

function HomePage() {
  const { properties } = useProperties()

  // Pick top featured properties or the first 3
  const featuredProperties = properties
    .filter((p) => p.featured)
    .slice(0, 3)

  // Fallback to first 3 properties if none marked featured
  const displayFeatured =
    featuredProperties.length > 0 ? featuredProperties : properties.slice(0, 3)

  return (
    <div className="home-page">
      {/* Hero Section */}
      <Hero />

      {/* Property Categories Section */}
      <section className="home-section categories-section">
        <div className="home-container">
          <div className="section-header">
            <span className="section-subtitle">Explore by Category</span>
            <h2 className="section-title">Browse Properties by Style</h2>
            <p className="section-desc">
              Whether you're looking for modern urban living, a suburban family
              home, or a private retreat, we have you covered.
            </p>
          </div>

          <div className="category-cards-grid">
            <Link
              to="/properties?type=Apartment"
              className="category-card"
            >
              <div className="category-img-wrap">
                <img
                  src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80"
                  alt="Apartments"
                  loading="lazy"
                />
                <div className="category-overlay"></div>
              </div>
              <div className="category-content">
                <h3>Apartments</h3>
                <p>Modern lofts, flats & high-rise penthouses</p>
                <span className="category-link-text">Browse Apartments →</span>
              </div>
            </Link>

            <Link
              to="/properties?type=House"
              className="category-card"
            >
              <div className="category-img-wrap">
                <img
                  src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80"
                  alt="Houses"
                  loading="lazy"
                />
                <div className="category-overlay"></div>
              </div>
              <div className="category-content">
                <h3>Houses</h3>
                <p>Spacious standalone residences & family homes</p>
                <span className="category-link-text">Browse Houses →</span>
              </div>
            </Link>

            <Link
              to="/properties?type=Villa"
              className="category-card"
            >
              <div className="category-img-wrap">
                <img
                  src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=600&q=80"
                  alt="Villas"
                  loading="lazy"
                />
                <div className="category-overlay"></div>
              </div>
              <div className="category-content">
                <h3>Villas</h3>
                <p>Luxury waterfront estates & panoramic hill retreats</p>
                <span className="category-link-text">Browse Villas →</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="home-section featured-section">
        <div className="home-container">
          <div className="section-header-row">
            <div>
              <span className="section-subtitle">Handpicked Selection</span>
              <h2 className="section-title">Featured Properties</h2>
            </div>
            <Link to="/properties" className="btn-secondary-link">
              Explore All Properties ({properties.length}) →
            </Link>
          </div>

          <PropertyGrid properties={displayFeatured} />

          <div className="featured-mobile-cta">
            <Link to="/properties" className="btn-secondary-link">
              Explore All Properties ({properties.length}) →
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose PropSpace Section */}
      <section className="home-section why-us-section">
        <div className="home-container">
          <div className="section-header">
            <span className="section-subtitle">The PropSpace Advantage</span>
            <h2 className="section-title">Why Choose PropSpace?</h2>
            <p className="section-desc">
              We eliminate the friction from buying, renting, and listing real
              estate with transparent processes and direct communication.
            </p>
          </div>

          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon-box">
                <svg
                  viewBox="0 0 24 24"
                  width="28"
                  height="28"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3>100% Verified Listings</h3>
              <p>
                Every listing is reviewed for accuracy in specifications, genuine
                photos, and authentic neighborhood details.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon-box">
                <svg
                  viewBox="0 0 24 24"
                  width="28"
                  height="28"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                  <path d="M12 18V6" />
                </svg>
              </div>
              <h3>Transparent Pricing</h3>
              <p>
                Zero surprise costs or hidden platform commissions. Clear upfront
                purchase prices and transparent rental estimates.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon-box">
                <svg
                  viewBox="0 0 24 24"
                  width="28"
                  height="28"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3>Direct Connections</h3>
              <p>
                Inquire directly with property owners and agents without
                confusing middleman delays or automated phone trees.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon-box">
                <svg
                  viewBox="0 0 24 24"
                  width="28"
                  height="28"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </div>
              <h3>Seamless Management</h3>
              <p>
                Manage your real estate listings from an intuitive dashboard with
                instant edits, status updates, and live views.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="home-section testimonials-section">
        <div className="home-container">
          <div className="section-header">
            <span className="section-subtitle">Real Stories</span>
            <h2 className="section-title">What Our Clients Say</h2>
            <p className="section-desc">
              Discover how home buyers, renters, and owners have found success
              with PropSpace.
            </p>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="star-rating">★★★★★</div>
              <p className="testimonial-quote">
                “PropSpace made our cross-country relocation to Seattle seamless.
                The neighborhood details and accurate photos meant there were no
                surprises when we visited our new craftsman home in person.”
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">SC</div>
                <div>
                  <strong>Sarah Jenkins</strong>
                  <span>Home Buyer, Seattle</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="star-rating">★★★★★</div>
              <p className="testimonial-quote">
                “Finding a pet-friendly luxury apartment in Miami usually takes
                weeks. On PropSpace, I filtered by amenities and connected with the
                agent the same afternoon. Absolutely top-tier experience!”
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">MR</div>
                <div>
                  <strong>Marcus Reynolds</strong>
                  <span>Apartment Renter, Miami</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="star-rating">★★★★★</div>
              <p className="testimonial-quote">
                “Listing my modern villa took less than 5 minutes. The layout
                presents properties beautifully and I received qualified inquiries
                within 48 hours of publishing.”
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">EL</div>
                <div>
                  <strong>Elena Larson</strong>
                  <span>Property Owner, Los Angeles</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="home-container">
          <div className="cta-box">
            <div className="cta-content">
              <h2>Are You a Property Owner?</h2>
              <p>
                List your apartment, house, or villa on PropSpace today. Reach
                thousands of verified home buyers and qualified tenants with zero
                hassle.
              </p>
              <div className="cta-buttons">
                <Link to="/list-property" className="btn-cta-primary">
                  List Your Property Now
                </Link>
                <Link to="/properties" className="btn-cta-secondary">
                  Browse Current Listings
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
