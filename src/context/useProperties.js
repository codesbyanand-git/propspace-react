import { useContext } from 'react'
import { PropertyContext } from './PropertyContextInstance'

export function useProperties() {
  const context = useContext(PropertyContext)
  if (!context) {
    throw new Error('useProperties must be used within a PropertyProvider')
  }
  return context
}
