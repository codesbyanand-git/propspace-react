import { useState } from 'react'
import { FALLBACK_PROPERTY_IMAGE } from '../data/sampleProperties'
import './PropertyForm.css'

const AVAILABLE_AMENITIES = [
  'Swimming Pool',
  'Fitness Center',
  'Private Garden',
  'Balcony / Terrace',
  '24/7 Security',
  'Central AC / Heating',
  'High-Speed Wi-Fi',
  'Pet Friendly',
  'In-Unit Laundry',
  'Elevator',
  'Covered Parking',
  'Smart Home'
]

function PropertyForm({ initialData = null, onSubmit, onCancel, isEditing = false }) {
  const [formData, setFormData] = useState(() => ({
    title: initialData?.title || '',
    purpose: initialData?.purpose || 'buy',
    type: initialData?.type || 'Apartment',
    price: initialData?.price || '',
    city: initialData?.city || '',
    location: initialData?.location || '',
    bedrooms: initialData?.bedrooms || '2',
    bathrooms: initialData?.bathrooms || '2',
    area: initialData?.area || '',
    furnishing: initialData?.furnishing || 'Furnished',
    parking: initialData?.parking || 'Covered Parking',
    description: initialData?.description || '',
    image: initialData?.image || '',
    amenities: initialData?.amenities || []
  }))

  const [errors, setErrors] = useState({})
  const [imagePreviewError, setImagePreviewError] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }

    if (name === 'image') {
      setImagePreviewError(false)
    }
  }

  const handleAmenityToggle = (amenity) => {
    setFormData((prev) => {
      const exists = prev.amenities.includes(amenity)
      return {
        ...prev,
        amenities: exists
          ? prev.amenities.filter((item) => item !== amenity)
          : [...prev.amenities, amenity]
      }
    })
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Property title is required.'
    } else if (formData.title.trim().length < 6) {
      newErrors.title = 'Title should be at least 6 characters.'
    }

    if (!formData.price || Number(formData.price) <= 0) {
      newErrors.price =
        formData.purpose === 'rent'
          ? 'Enter a valid positive monthly rent.'
          : 'Enter a valid positive purchase price.'
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required.'
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Full address or locality is required.'
    }

    if (!formData.area || Number(formData.area) <= 0) {
      newErrors.area = 'Enter a valid square footage (e.g. 1200).'
    }

    if (!formData.bedrooms || Number(formData.bedrooms) < 0) {
      newErrors.bedrooms = 'Select a valid number of bedrooms.'
    }

    if (!formData.bathrooms || Number(formData.bathrooms) < 0) {
      newErrors.bathrooms = 'Select a valid number of bathrooms.'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Please provide a brief property description.'
    } else if (formData.description.trim().length < 20) {
      newErrors.description = 'Description should be at least 20 characters.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validate()) {
      return
    }

    const payload = {
      ...formData,
      image: formData.image.trim() || FALLBACK_PROPERTY_IMAGE
    }

    onSubmit(payload)
  }

  return (
    <form className="property-form" onSubmit={handleSubmit} noValidate>
      {/* Purpose & Type */}
      <div className="form-section">
        <h3 className="form-section-title">1. Basic Listing Type</h3>
        <div className="form-row two-col">
          <div className="form-group">
            <label htmlFor="field-purpose">
              Listing Purpose <span className="required">*</span>
            </label>
            <div className="purpose-select-buttons">
              <button
                type="button"
                className={`purpose-toggle ${formData.purpose === 'buy' ? 'active' : ''}`}
                onClick={() => setFormData((prev) => ({ ...prev, purpose: 'buy' }))}
              >
                For Sale (Buy)
              </button>
              <button
                type="button"
                className={`purpose-toggle ${formData.purpose === 'rent' ? 'active' : ''}`}
                onClick={() => setFormData((prev) => ({ ...prev, purpose: 'rent' }))}
              >
                For Rent
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="field-type">
              Property Type <span className="required">*</span>
            </label>
            <select
              id="field-type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
            >
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
              <option value="Villa">Villa</option>
            </select>
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="form-section">
        <h3 className="form-section-title">2. Property Overview</h3>

        <div className="form-group">
          <label htmlFor="field-title">
            Property Title <span className="required">*</span>
          </label>
          <input
            id="field-title"
            name="title"
            type="text"
            placeholder="e.g. Modern Sunset Villa with Infinity Pool"
            value={formData.title}
            onChange={handleInputChange}
            className={errors.title ? 'has-error' : ''}
          />
          {errors.title && <span className="error-message">{errors.title}</span>}
        </div>

        <div className="form-row two-col">
          <div className="form-group">
            <label htmlFor="field-price">
              {formData.purpose === 'rent' ? 'Monthly Rent ($)' : 'Sale Price ($)'}{' '}
              <span className="required">*</span>
            </label>
            <input
              id="field-price"
              name="price"
              type="number"
              min="0"
              step="100"
              placeholder={formData.purpose === 'rent' ? 'e.g. 3500' : 'e.g. 650000'}
              value={formData.price}
              onChange={handleInputChange}
              className={errors.price ? 'has-error' : ''}
            />
            {errors.price && <span className="error-message">{errors.price}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="field-area">
              Area (sqft) <span className="required">*</span>
            </label>
            <input
              id="field-area"
              name="area"
              type="number"
              min="0"
              placeholder="e.g. 2100"
              value={formData.area}
              onChange={handleInputChange}
              className={errors.area ? 'has-error' : ''}
            />
            {errors.area && <span className="error-message">{errors.area}</span>}
          </div>
        </div>

        <div className="form-row two-col">
          <div className="form-group">
            <label htmlFor="field-city">
              City <span className="required">*</span>
            </label>
            <input
              id="field-city"
              name="city"
              type="text"
              placeholder="e.g. Seattle, WA or Miami, FL"
              value={formData.city}
              onChange={handleInputChange}
              className={errors.city ? 'has-error' : ''}
            />
            {errors.city && <span className="error-message">{errors.city}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="field-location">
              Neighborhood / Address <span className="required">*</span>
            </label>
            <input
              id="field-location"
              name="location"
              type="text"
              placeholder="e.g. Maplewood Ave, Downtown Seattle"
              value={formData.location}
              onChange={handleInputChange}
              className={errors.location ? 'has-error' : ''}
            />
            {errors.location && <span className="error-message">{errors.location}</span>}
          </div>
        </div>
      </div>

      {/* Specifications */}
      <div className="form-section">
        <h3 className="form-section-title">3. Specifications & Furnishing</h3>

        <div className="form-row four-col">
          <div className="form-group">
            <label htmlFor="field-bedrooms">Bedrooms</label>
            <select
              id="field-bedrooms"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleInputChange}
            >
              <option value="1">1 Bed</option>
              <option value="2">2 Beds</option>
              <option value="3">3 Beds</option>
              <option value="4">4 Beds</option>
              <option value="5">5+ Beds</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="field-bathrooms">Bathrooms</label>
            <select
              id="field-bathrooms"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleInputChange}
            >
              <option value="1">1 Bath</option>
              <option value="2">2 Baths</option>
              <option value="3">3 Baths</option>
              <option value="4">4 Baths</option>
              <option value="5">5+ Baths</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="field-furnishing">Furnishing</label>
            <select
              id="field-furnishing"
              name="furnishing"
              value={formData.furnishing}
              onChange={handleInputChange}
            >
              <option value="Furnished">Furnished</option>
              <option value="Semi-Furnished">Semi-Furnished</option>
              <option value="Unfurnished">Unfurnished</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="field-parking">Parking</label>
            <select
              id="field-parking"
              name="parking"
              value={formData.parking}
              onChange={handleInputChange}
            >
              <option value="Covered Parking">Covered Parking</option>
              <option value="Garage (2 Cars)">Garage (2 Cars)</option>
              <option value="Street Parking">Street Parking</option>
              <option value="None">None</option>
            </select>
          </div>
        </div>
      </div>

      {/* Amenities Selection */}
      <div className="form-section">
        <h3 className="form-section-title">4. Features & Amenities</h3>
        <p className="form-hint">Select all that apply to this property.</p>
        <div className="amenities-checkbox-grid">
          {AVAILABLE_AMENITIES.map((amenity) => (
            <label key={amenity} className="amenity-checkbox-label">
              <input
                type="checkbox"
                checked={formData.amenities.includes(amenity)}
                onChange={() => handleAmenityToggle(amenity)}
              />
              <span>{amenity}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Photo & Description */}
      <div className="form-section">
        <h3 className="form-section-title">5. Image & Description</h3>

        <div className="form-group">
          <label htmlFor="field-image">Image URL</label>
          <input
            id="field-image"
            name="image"
            type="url"
            placeholder="Paste direct image URL (e.g. from Unsplash) or leave empty for default photo"
            value={formData.image}
            onChange={handleInputChange}
          />
          <span className="form-hint">
            Tip: Leave blank to use our high-resolution real-estate fallback photo.
          </span>
          {formData.image && (
            <div className="form-image-preview">
              <p>Image Preview:</p>
              <img
                src={imagePreviewError ? FALLBACK_PROPERTY_IMAGE : formData.image}
                alt="Property preview"
                onError={() => setImagePreviewError(true)}
              />
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="field-desc">
            Property Description <span className="required">*</span>
          </label>
          <textarea
            id="field-desc"
            name="description"
            rows="5"
            placeholder="Describe the architectural highlights, neighborhood perks, proximity to schools, transit, and features..."
            value={formData.description}
            onChange={handleInputChange}
            className={errors.description ? 'has-error' : ''}
          ></textarea>
          {errors.description && (
            <span className="error-message">{errors.description}</span>
          )}
        </div>
      </div>

      {/* Form Action Buttons */}
      <div className="form-actions">
        {onCancel && (
          <button type="button" className="btn-cancel" onClick={onCancel}>
            Cancel
          </button>
        )}
        <button type="submit" className="btn-submit">
          {isEditing ? 'Save Changes' : 'Publish Property Listing'}
        </button>
      </div>
    </form>
  )
}

export default PropertyForm
