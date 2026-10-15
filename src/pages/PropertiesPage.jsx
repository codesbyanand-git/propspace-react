import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import PropertyFilters from '../components/PropertyFilters'
import PropertyGrid from '../components/PropertyGrid'
import { useProperties } from '../context/useProperties'
import './PropertiesPage.css'

function PropertiesPage() {
  const { properties } = useProperties()
  const [searchParams, setSearchParams] = useSearchParams()

  // Derive URL-based parameters
  const purpose = searchParams.get('purpose') || 'all'
  const location = searchParams.get('location') || ''
  const type = searchParams.get('type') || 'all'

  // Local filter states for price, bedrooms, sorting
  const [localFilters, setLocalFilters] = useState({
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    bedrooms: searchParams.get('bedrooms') || 'all',
    sortBy: searchParams.get('sortBy') || 'default'
  })

  // Combined filters object
  const filters = useMemo(
    () => ({
      purpose,
      location,
      type,
      ...localFilters
    }),
    [purpose, location, type, localFilters]
  )

  // Handlers for modifying filter controls
  const handleFilterUpdate = (updater) => {
    const updated = typeof updater === 'function' ? updater(filters) : updater

    // Check if URL search params need updating
    const nextParams = new URLSearchParams(searchParams)

    if (updated.purpose && updated.purpose !== 'all') {
      nextParams.set('purpose', updated.purpose)
    } else {
      nextParams.delete('purpose')
    }

    if (updated.location && updated.location.trim()) {
      nextParams.set('location', updated.location.trim())
    } else {
      nextParams.delete('location')
    }

    if (updated.type && updated.type !== 'all') {
      nextParams.set('type', updated.type)
    } else {
      nextParams.delete('type')
    }

    setSearchParams(nextParams, { replace: true })

    setLocalFilters({
      minPrice: updated.minPrice || '',
      maxPrice: updated.maxPrice || '',
      bedrooms: updated.bedrooms || 'all',
      sortBy: updated.sortBy || 'default'
    })
  }

  // Reset filters back to default
  const handleResetFilters = () => {
    setSearchParams({}, { replace: true })
    setLocalFilters({
      minPrice: '',
      maxPrice: '',
      bedrooms: 'all',
      sortBy: 'default'
    })
  }

  // Filter & sort logic
  const filteredProperties = useMemo(() => {
    return properties
      .filter((prop) => {
        // Purpose filter
        if (filters.purpose !== 'all' && prop.purpose !== filters.purpose) {
          return false
        }

        // Location / Keyword filter
        if (filters.location.trim()) {
          const query = filters.location.toLowerCase().trim()
          const matchesLocation =
            prop.location.toLowerCase().includes(query) ||
            (prop.city && prop.city.toLowerCase().includes(query)) ||
            prop.title.toLowerCase().includes(query)

          if (!matchesLocation) return false
        }

        // Property Type filter
        if (filters.type !== 'all' && prop.type !== filters.type) {
          return false
        }

        // Min Price filter
        if (filters.minPrice && Number(prop.price) < Number(filters.minPrice)) {
          return false
        }

        // Max Price filter
        if (filters.maxPrice && Number(prop.price) > Number(filters.maxPrice)) {
          return false
        }

        // Bedrooms filter
        if (filters.bedrooms !== 'all') {
          const minBeds = Number(filters.bedrooms)
          if (Number(prop.bedrooms) < minBeds) {
            return false
          }
        }

        return true
      })
      .sort((a, b) => {
        if (filters.sortBy === 'price-asc') {
          return Number(a.price) - Number(b.price)
        }
        if (filters.sortBy === 'price-desc') {
          return Number(b.price) - Number(a.price)
        }
        if (filters.sortBy === 'newest') {
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
        }
        // Default: featured first
        if (a.featured && !b.featured) return -1
        if (!a.featured && b.featured) return 1
        return 0
      })
  }, [properties, filters])

  // Dynamic Page Header Title
  const getHeaderTitle = () => {
    if (filters.purpose === 'buy') return 'Properties for Sale'
    if (filters.purpose === 'rent') return 'Properties for Rent'
    return 'All Available Properties'
  }

  return (
    <div className="properties-page">
      {/* Page Hero Header */}
      <div className="properties-header-banner">
        <div className="properties-container">
          <h1 className="properties-page-title">{getHeaderTitle()}</h1>
          <p className="properties-page-desc">
            Find the right sanctuary matching your budget, preferred city, and
            lifestyle needs.
          </p>
        </div>
      </div>

      <div className="properties-container main-content-wrap">
        {/* Filter Toolbar */}
        <PropertyFilters
          filters={filters}
          setFilters={handleFilterUpdate}
          onReset={handleResetFilters}
          totalCount={properties.length}
          filteredCount={filteredProperties.length}
        />

        {/* Results Grid */}
        <PropertyGrid
          properties={filteredProperties}
          onResetFilters={handleResetFilters}
          emptyMessage="No properties found matching your specific combination of filters. Try clearing your price range or location keyword to see more options."
        />
      </div>
    </div>
  )
}

export default PropertiesPage
