import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import PropertyForm from '../components/PropertyForm'
import { useProperties } from '../context/useProperties'
import { FALLBACK_PROPERTY_IMAGE } from '../data/sampleProperties'
import './ManageListingsPage.css'

function ManageListingsPage() {
  const { properties, updateProperty, deleteProperty, resetToDefault } = useProperties()

  const [searchTerm, setSearchTerm] = useState('')
  const [filterPurpose, setFilterPurpose] = useState('all')

  // Edit State
  const [editingProperty, setEditingProperty] = useState(null)

  // Delete Confirmation State
  const [propertyToDelete, setPropertyToDelete] = useState(null)

  // Toast / notification
  const [toastMessage, setToastMessage] = useState('')

  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 3500)
  }

  // Filter properties in table
  const displayedProperties = useMemo(() => {
    return properties.filter((p) => {
      if (filterPurpose !== 'all' && p.purpose !== filterPurpose) {
        return false
      }
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase().trim()
        const matches =
          p.title.toLowerCase().includes(query) ||
          p.location.toLowerCase().includes(query) ||
          p.type.toLowerCase().includes(query)
        if (!matches) return false
      }
      return true
    })
  }, [properties, filterPurpose, searchTerm])

  // Stats
  const forSaleCount = properties.filter((p) => p.purpose === 'buy').length
  const forRentCount = properties.filter((p) => p.purpose === 'rent').length

  const handleEditSubmit = (updatedData) => {
    if (!editingProperty) return
    updateProperty(editingProperty.id, updatedData)
    showToast(`Successfully updated "${updatedData.title}"`)
    setEditingProperty(null)
  }

  const handleDeleteConfirm = () => {
    if (!propertyToDelete) return
    deleteProperty(propertyToDelete.id)
    showToast(`Deleted "${propertyToDelete.title}"`)
    setPropertyToDelete(null)
  }

  const handleResetData = () => {
    if (
      window.confirm(
        'Are you sure you want to reset all properties to the original sample dataset?'
      )
    ) {
      resetToDefault()
      showToast('Sample dataset restored!')
    }
  }

  const formatPrice = (price, purpose) => {
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price)
    return purpose === 'rent' ? `${formatted} / mo` : formatted
  }

  return (
    <div className="manage-page">
      {/* Toast Notification */}
      {toastMessage && <div className="manage-toast">{toastMessage}</div>}

      {/* Header Banner */}
      <div className="manage-header-banner">
        <div className="manage-container">
          <div className="manage-header-row">
            <div>
              <span className="badge-banner">Administration & Inventory</span>
              <h1 className="manage-title">Manage Property Listings</h1>
              <p className="manage-subtitle">
                View, modify, or remove active properties in your local portfolio.
              </p>
            </div>
            <div className="header-actions">
              <Link to="/list-property" className="btn-add-listing">
                + Add New Listing
              </Link>
              <button
                type="button"
                className="btn-reset-demo"
                onClick={handleResetData}
                title="Restore default sample listings"
              >
                Reset Demo Data
              </button>
            </div>
          </div>

          {/* Quick Stats Cards */}
          <div className="stats-row">
            <div className="stat-card">
              <span className="stat-num">{properties.length}</span>
              <span className="stat-lbl">Total Properties</span>
            </div>
            <div className="stat-card">
              <span className="stat-num">{forSaleCount}</span>
              <span className="stat-lbl">Listed for Sale</span>
            </div>
            <div className="stat-card">
              <span className="stat-num">{forRentCount}</span>
              <span className="stat-lbl">Listed for Rent</span>
            </div>
          </div>
        </div>
      </div>

      <div className="manage-container main-table-wrap">
        {/* Search & Filter Toolbar */}
        <div className="table-toolbar">
          <div className="table-search-input">
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search by title, location, or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-purpose-tabs">
            <button
              type="button"
              className={`tab-filter-btn ${filterPurpose === 'all' ? 'active' : ''}`}
              onClick={() => setFilterPurpose('all')}
            >
              All ({properties.length})
            </button>
            <button
              type="button"
              className={`tab-filter-btn ${filterPurpose === 'buy' ? 'active' : ''}`}
              onClick={() => setFilterPurpose('buy')}
            >
              For Sale ({forSaleCount})
            </button>
            <button
              type="button"
              className={`tab-filter-btn ${filterPurpose === 'rent' ? 'active' : ''}`}
              onClick={() => setFilterPurpose('rent')}
            >
              For Rent ({forRentCount})
            </button>
          </div>
        </div>

        {/* Listings Table / Empty State */}
        {displayedProperties.length === 0 ? (
          <div className="table-empty-box">
            <h3>No Listings Found</h3>
            <p>No properties matched your search term or filter selection.</p>
            <button
              type="button"
              className="btn-clear-search"
              onClick={() => {
                setSearchTerm('')
                setFilterPurpose('all')
              }}
            >
              Clear Search & Filter
            </button>
          </div>
        ) : (
          <div className="table-card">
            <div className="table-responsive">
              <table className="listings-table">
                <thead>
                  <tr>
                    <th>Property</th>
                    <th>Purpose</th>
                    <th>Type</th>
                    <th>Price / Rent</th>
                    <th>Specs</th>
                    <th>Created</th>
                    <th className="actions-header">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedProperties.map((prop) => (
                    <tr key={prop.id}>
                      {/* Thumbnail & Title */}
                      <td>
                        <div className="table-prop-info">
                          <img
                            src={prop.image || FALLBACK_PROPERTY_IMAGE}
                            alt=""
                            className="table-prop-img"
                            onError={(e) => {
                              e.currentTarget.src = FALLBACK_PROPERTY_IMAGE
                            }}
                          />
                          <div>
                            <Link
                              to={`/properties/${prop.id}`}
                              className="table-prop-title"
                            >
                              {prop.title}
                            </Link>
                            <span className="table-prop-location">{prop.location}</span>
                          </div>
                        </div>
                      </td>

                      {/* Purpose */}
                      <td>
                        <span className={`table-badge ${prop.purpose}`}>
                          {prop.purpose === 'buy' ? 'For Sale' : 'For Rent'}
                        </span>
                      </td>

                      {/* Type */}
                      <td>
                        <span className="table-type-pill">{prop.type}</span>
                      </td>

                      {/* Price */}
                      <td>
                        <strong className="table-price-text">
                          {formatPrice(prop.price, prop.purpose)}
                        </strong>
                      </td>

                      {/* Specs */}
                      <td>
                        <span className="table-specs-text">
                          {prop.bedrooms}b • {prop.bathrooms}ba • {prop.area} sqft
                        </span>
                      </td>

                      {/* Date */}
                      <td>
                        <span className="table-date-text">
                          {prop.createdAt || 'Recent'}
                        </span>
                      </td>

                      {/* Action Buttons */}
                      <td>
                        <div className="table-action-btns">
                          <Link
                            to={`/properties/${prop.id}`}
                            className="action-btn view"
                            title="View Public Page"
                          >
                            View
                          </Link>
                          <button
                            type="button"
                            className="action-btn edit"
                            onClick={() => setEditingProperty(prop)}
                            title="Edit Listing"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="action-btn delete"
                            onClick={() => setPropertyToDelete(prop)}
                            title="Delete Listing"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* EDIT MODAL */}
      {editingProperty && (
        <div className="modal-backdrop" onClick={() => setEditingProperty(null)}>
          <div
            className="modal-card edit-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-dialog-title"
          >
            <div className="modal-header">
              <h2 id="edit-dialog-title">Edit Property Listing</h2>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setEditingProperty(null)}
                aria-label="Close edit dialog"
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <PropertyForm
                key={editingProperty.id}
                initialData={editingProperty}
                isEditing={true}
                onSubmit={handleEditSubmit}
                onCancel={() => setEditingProperty(null)}
              />
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {propertyToDelete && (
        <div className="modal-backdrop" onClick={() => setPropertyToDelete(null)}>
          <div
            className="modal-card delete-modal"
            onClick={(e) => e.stopPropagation()}
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-dialog-title"
          >
            <div className="delete-icon-box">⚠️</div>
            <h3 id="delete-dialog-title">Confirm Deletion</h3>
            <p className="delete-warning-text">
              Are you sure you want to delete{' '}
              <strong>"{propertyToDelete.title}"</strong>?
            </p>
            <p className="delete-subtext">
              This action will remove the property from your current session and local
              storage.
            </p>
            <div className="modal-actions">
              <button
                type="button"
                className="btn-cancel-modal"
                onClick={() => setPropertyToDelete(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-confirm-delete"
                onClick={handleDeleteConfirm}
              >
                Delete Property
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ManageListingsPage
