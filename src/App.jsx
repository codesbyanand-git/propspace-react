import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PropertyProvider } from './context/PropertyContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

// Pages
import HomePage from './pages/HomePage'
import PropertiesPage from './pages/PropertiesPage'
import PropertyDetailsPage from './pages/PropertyDetailsPage'
import ListPropertyPage from './pages/ListPropertyPage'
import ManageListingsPage from './pages/ManageListingsPage'
import NotFoundPage from './pages/NotFoundPage'

import './App.css'

function App() {
  return (
    <PropertyProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/properties" element={<PropertiesPage />} />
              <Route path="/properties/:id" element={<PropertyDetailsPage />} />
              <Route path="/list-property" element={<ListPropertyPage />} />
              <Route path="/manage-listings" element={<ManageListingsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </PropertyProvider>
  )
}

export default App
