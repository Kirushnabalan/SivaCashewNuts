import { Link } from "react-router-dom"
import { Mail, Phone, MapPin } from "lucide-react"
import { ROUTES, CONTACT_INFO } from "@constants"
import "./Footer.css"
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">Siva Cashew Nuts</h3>
            <p className="footer-description">
              Premium quality cashew nuts delivered fresh to your doorstep. Experience the finest taste and nutrition in
              every bite.
            </p>
          </div>

          <div className="footer-section">
            <h4 className="footer-subtitle">Quick Links</h4>
            <ul className="footer-links">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/shop">Shop</a>
              </li>
              <li>
                <a href="/about">About Us</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-subtitle">Contact Info</h4>
            <div className="contact-info">
              <div className="contact-item">
                <Phone size={16} />
                <span>{CONTACT_INFO.phone}</span>
              </div>
              <div className="contact-item">
                <Mail size={16} />
                <span>{CONTACT_INFO.email}</span>
              </div>
              <div className="contact-item">
                <MapPin size={16} />
                <span>Your Location Here</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 Siva Cashew Nuts. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
