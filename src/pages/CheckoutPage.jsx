import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { CartContext } from "@context/CartContext"
import { useCart } from "@context/CartContext"
import { formatCurrency, isValidEmail } from "@utils/helpers"
import { ROUTES } from "@constants"
import Button from "@components/ui/Button"
import Input from "@components/ui/Input"
import Card from "@components/ui/Card"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import { getNames } from "country-list"
import "./CheckoutPage.css"

const CheckoutPage = () => {
  const navigate = useNavigate()
  const { cart, clearCart, getCartTotal, getShippingCost } = useCart()
  const { saveDraftItems } = useContext(CartContext)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

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
    } else if (formData.phone.replace(/\D/g, "").length < 10) {
      newErrors.phone = "Please enter a valid phone number"
    }
    if (!formData.address.trim()) newErrors.address = "Address is required"
    if (!formData.city.trim()) newErrors.city = "City is required"
    if (!formData.country.trim()) newErrors.country = "Country is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  setLoading(true);
  setErrors({});

  const orderData = {
    customer: formData,
    items: cart,
    totalAmount: total,
    orderDate: new Date().toISOString(),
  };

  try {
    console.log('Sending order data:', orderData);
    
    const res = await fetch(`${API_BASE_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    console.log('Response status:', res.status);
    console.log('Response headers:', res.headers);

    // Get response text first to handle empty responses
    const responseText = await res.text();
    console.log('Response text:', responseText);

    // Check if response is ok
    if (!res.ok) {
      let errorMessage = `HTTP ${res.status}: ${res.statusText}`;
      
      if (responseText.trim()) {
        try {
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.message || errorMessage;
        } catch {
          errorMessage = responseText;
        }
      }
      
      throw new Error(errorMessage);
    }

    // Handle empty response (which might be success)
    if (!responseText.trim()) {
      console.log('Empty response received, assuming success');
      clearCart();
      navigate(ROUTES.SUCCESS);
      return;
    }

    // Try to parse JSON response
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Failed to parse JSON response:', responseText);
      console.error('Parse error:', parseError);
      
      // If status is ok but can't parse JSON, still consider it successful
      if (res.status >= 200 && res.status < 300) {
        clearCart();
        navigate(ROUTES.SUCCESS);
        return;
      }
      
      throw new Error('Invalid response from server');
    }

    // Check if the response indicates success
    if (data.success !== false) {
      console.log('Order successful:', data);
      clearCart();
      navigate(ROUTES.SUCCESS);
    } else {
      throw new Error(data.message || 'Order failed');
    }

  } catch (error) {
    console.error("Checkout error:", error);
    setErrors({ 
      submit: error.message || "Order failed. Please try again." 
    });
  } finally {
    setLoading(false);
  }
};

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

                    <div className="form-control">
                      <label>Phone</label>
                      <PhoneInput
                        country={"us"}
                        value={formData.phone}
                        onChange={(value, data) => {
                          setFormData((prev) => ({
                            ...prev,
                            phone: value,
                            country: data?.name || prev.country,
                          }))
                          if (errors.phone) {
                            setErrors((prev) => ({ ...prev, phone: "" }))
                          }
                        }}
                        inputClass="react-phone-input"
                      />
                      {errors.phone && <div className="form-error">{errors.phone}</div>}
                    </div>
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

                  <div className="form-control">
                    <label>Country</label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Country</option>
                      {getNames().map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                    {errors.country && <div className="form-error">{errors.country}</div>}
                  </div>

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
