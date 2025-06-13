import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { CartContext } from "@context/CartContext"
import { useCart } from "@context/CartContext"
import { formatCurrency, isValidEmail, isValidPhone } from "@utils/helpers"
import { ROUTES } from "@constants"
import Button from "@components/ui/Button"
import Input from "@components/ui/Input"
import Card from "@components/ui/Card"
import "./CheckoutPage.css"

const CheckoutPage = () => {
  const navigate = useNavigate()
  const { cart, clearCart, getCartTotal, getShippingCost } = useCart()
  const { saveDraftItems } = useContext(CartContext)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  })

  const subtotal = getCartTotal()
  const shipping = getShippingCost()
  const total = subtotal + shipping

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!isValidPhone(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number"
    }
    if (!formData.address.trim()) newErrors.address = "Address is required"
    if (!formData.city.trim()) newErrors.city = "City is required"
    if (!formData.country.trim()) newErrors.country = "Country is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)
    setErrors({})

    try {
      const orderData = {
        customer: formData,
        items: cart,
        subtotal,
        shipping,
        total,
        orderDate: new Date().toISOString(),
        paymentMethod: "COD",
      }

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/email/send-order-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || `Server error: ${response.status}`)
      }

      // Success
      clearCart()
      navigate(ROUTES.SUCCESS)
    } catch (error) {
      console.error("Checkout error:", error)
      setErrors({
        submit: error.message || "Failed to process order. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleBackToCart = () => {
    saveDraftItems()
    navigate(ROUTES.CART)
  }

  if (cart.length === 0) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="empty-checkout">
            <h2>Your cart is empty</h2>
            <p>Add some products before checkout</p>
            <Button as="a" href={ROUTES.SHOP}>
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <div className="checkout-header">
          <button onClick={handleBackToCart} className="back-link">
            <ArrowLeft size={20} />
            Back to Cart
          </button>
          <h1 className="page-title">Checkout</h1>
        </div>

        <div className="checkout-content">
          <div className="checkout-form">
            <Card>
              <Card.Header>
                <h3>Shipping Information</h3>
              </Card.Header>

              <Card.Body>
                <form onSubmit={handleSubmit}>
                  <div className="form-grid">
                    <Input
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      error={errors.firstName}
                      required
                    />
                    <Input
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      error={errors.lastName}
                      required
                    />
                  </div>

                  <div className="form-grid">
                    <Input
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      error={errors.email}
                      required
                    />
                    <Input
                      label="Phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      error={errors.phone}
                      required
                    />
                  </div>

                  <Input
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    error={errors.address}
                    required
                  />

                  <div className="form-grid">
                    <Input
                      label="City"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      error={errors.city}
                      required
                    />
                    <Input
                      label="Postal Code"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      error={errors.postalCode}
                    />
                  </div>

                  <Input
                    label="Country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    error={errors.country}
                    required
                  />

                  {errors.submit && <div className="form-error">{errors.submit}</div>}
                </form>
              </Card.Body>
            </Card>
          </div>

          <div className="order-summary">
            <Card className="summary-card">
              <Card.Header>
                <h3>Order Summary</h3>
              </Card.Header>

              <Card.Body>
                <div className="order-items">
                  {cart.map((item) => (
                    <div key={item._id} className="order-item">
                      <img src={item.image || "/placeholder.svg"} alt={item.name} />
                      <div className="item-info">
                        <h4>{item.name}</h4>
                        <p>Qty: {item.quantity}</p>
                      </div>
                      <div className="item-price">{formatCurrency(item.price * item.quantity)}</div>
                    </div>
                  ))}
                </div>

                <div className="summary-totals">
                  <div className="summary-line">
                    <span>Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="summary-line">
                    <span>Shipping</span>
                    <span>{formatCurrency(shipping)}</span>
                  </div>
                  <div className="summary-line total">
                    <span>Total</span>
                    <span>{formatCurrency(total)}</span>
                  </div>
                </div>

                <div className="payment-info">
                  <h4>Payment Method</h4>
                  <p>Cash on Delivery (COD)</p>
                  <small>Pay when your order arrives at your doorstep</small>
                </div>
              </Card.Body>

              <Card.Footer>
                <Button
                  onClick={handleSubmit}
                  loading={loading}
                  disabled={loading}
                  size="lg"
                  className="place-order-btn"
                >
                  Place Order - {formatCurrency(total)}
                </Button>
              </Card.Footer>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
