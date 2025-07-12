import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ShoppingCart } from "lucide-react"
import { useCart } from "@context/CartContext"
import { ROUTES } from "@constants"
import "./Navbar.css"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { getCartItemCount } = useCart()
  const location = useLocation()

  const cartItemCount = getCartItemCount()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", path: ROUTES.HOME },
    { name: "Shop", path: ROUTES.SHOP },
    { name: "About", path: ROUTES.ABOUT },
    { name: "Contact", path: ROUTES.CONTACT },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <motion.nav
      className={`navbar ${scrolled ? "scrolled" : ""}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container">
        <div className="navbar-content">
          {/* Logo */}
          <Link to={ROUTES.HOME} className="navbar-logo">
            <motion.img
              src="/placeholder.svg?height=40&width=40"
              alt="Siva Cashew Nuts"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            />
            <span>Siva Cashew Nuts</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="navbar-nav desktop-nav">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path} className={`nav-link ${isActive(item.path) ? "active" : ""}`}>
                {item.name}
              </Link>
            ))}
          </div>

          {/* Cart & Mobile Menu */}
          <div className="navbar-actions">
            <Link to={ROUTES.CART} className="cart-button">
              <ShoppingCart size={20} />
              <AnimatePresence>
                {cartItemCount > 0 && (
                  <motion.span className="cart-badge" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    {cartItemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            <button className="mobile-menu-button" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="mobile-nav"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`mobile-nav-link ${isActive(item.path) ? "active" : ""}`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

export default Navbar
