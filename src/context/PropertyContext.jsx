import { useState, useEffect } from 'react'
import { PropertyContext } from './PropertyContextInstance'
import { SAMPLE_PROPERTIES } from '../data/sampleProperties'

const STORAGE_KEY = 'propspace_properties_data_v1'

export function PropertyProvider({ children }) {
  const [properties, setProperties] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed
        }
      }
    } catch (err) {
      console.warn('Could not load properties from localStorage', err)
    }
    return SAMPLE_PROPERTIES
  })

  // Persist properties to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(properties))
    } catch (err) {
      console.warn('Could not save properties to localStorage', err)
    }
  }, [properties])

  // Get a single property by its ID
  const getPropertyById = (id) => {
    return properties.find((p) => String(p.id) === String(id))
  }

  // Add a new property
  const addProperty = (newProp) => {
    const propertyWithId = {
      ...newProp,
      id: `prop-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      featured: false,
      price: Number(newProp.price),
      bedrooms: Number(newProp.bedrooms),
      bathrooms: Number(newProp.bathrooms),
      area: Number(newProp.area),
      amenities: Array.isArray(newProp.amenities)
        ? newProp.amenities
        : (newProp.amenities || '')
            .split(',')
            .map((a) => a.trim())
            .filter(Boolean),
      images: newProp.image ? [newProp.image] : []
    }

    setProperties((prev) => [propertyWithId, ...prev])
    return propertyWithId
  }

  // Update an existing property
  const updateProperty = (id, updatedFields) => {
    let updatedProperty = null
    setProperties((prev) =>
      prev.map((prop) => {
        if (String(prop.id) === String(id)) {
          updatedProperty = {
            ...prop,
            ...updatedFields,
            price: Number(updatedFields.price ?? prop.price),
            bedrooms: Number(updatedFields.bedrooms ?? prop.bedrooms),
            bathrooms: Number(updatedFields.bathrooms ?? prop.bathrooms),
            area: Number(updatedFields.area ?? prop.area),
            amenities: Array.isArray(updatedFields.amenities)
              ? updatedFields.amenities
              : typeof updatedFields.amenities === 'string'
              ? updatedFields.amenities
                  .split(',')
                  .map((a) => a.trim())
                  .filter(Boolean)
              : prop.amenities,
            images: updatedFields.image
              ? [updatedFields.image, ...(prop.images?.slice(1) || [])]
              : prop.images
          }
          return updatedProperty
        }
        return prop
      })
    )
    return updatedProperty
  }

  // Delete a property by ID
  const deleteProperty = (id) => {
    setProperties((prev) => prev.filter((p) => String(p.id) !== String(id)))
  }

  // Reset to sample default data
  const resetToDefault = () => {
    setProperties(SAMPLE_PROPERTIES)
    localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <PropertyContext.Provider
      value={{
        properties,
        getPropertyById,
        addProperty,
        updateProperty,
        deleteProperty,
        resetToDefault
      }}
    >
      {children}
    </PropertyContext.Provider>
  )
}
