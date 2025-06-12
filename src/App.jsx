import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useEffect } from "react"
import AOS from "aos"
import "aos/dist/aos.css"

// Providers
import { CartProvider } from "@context/CartContext"

// Layout Components
import Navbar from "@components/layout/Navbar"
import Footer from "@components/layout/Footer"

// Pages
import HomePage from "@pages/HomePage"
import ShopPage from "@pages/ShopPage"
import AboutPage from "@pages/AboutPage"
import ContactPage from "@pages/ContactPage"
import CartPage from "@pages/CartPage"
import CheckoutPage from "@pages/CheckoutPage"
import SuccessPage from "@pages/SuccessPage"

// Styles
import "@styles/App.css"

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out-cubic",
    })
  }, [])

  return (
    <CartProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/success" element={<SuccessPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  )
}

export default App
