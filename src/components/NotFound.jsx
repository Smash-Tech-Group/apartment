import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './footer'

function NotFound() {
  return (
    <div className='text-black'>
      <Navbar showNavLinks={false} />

      <main className="pt-24">
        <section className="max-w-screen-2xl mx-auto px-4">
          <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
            <p className="text-xs tracking-wider text-gray-500 mb-2">Oops, page not found</p>
            <h1 className="text-7xl sm:text-8xl font-meutasBlack text-black leading-tight">404</h1>
            <h2 className="mt-3 text-xl sm:text-2xl font-semibold">This page doesn’t exist</h2>
            <p className="mt-2 text-sm text-gray-600 max-w-lg">
              The link may be broken or the page may have been removed. Try going back to the homepage or continue exploring our services.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                to="/"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-white text-sm font-medium hover:bg-opacity-90 transition-colors"
              >
                Go to Homepage
              </Link>
              <Link
                to="/car-rentals"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-gray-300 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Browse Car Rentals
              </Link>
            </div>

            <div className="mt-10 text-xs text-gray-500">
              <span>Need help?</span>{' '}
              <Link to="/faq" className="text-primary font-medium hover:opacity-80">Visit FAQs</Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default NotFound