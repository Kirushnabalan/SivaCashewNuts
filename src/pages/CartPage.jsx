import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ArrowLeft, Plus, Minus, Trash2 } from "lucide-react"
import { useCart } from "@context/CartContext"
import { formatCurrency, calculateDiscount } from "@utils/helpers"
import { ROUTES, PROMO_CODES } from "@constants"
import Button from "@components/ui/Button"
import Card from "@components/ui/Card"
import "./CartPage.css"

const CartPage = () => {
  const navigate = useNavigate()
  const { cart, updateQuantity, removeFromCart, getCartTotal, getShippingCost } = useCart()
  const [promoCode, setPromoCode] = useState("")
  const [discount, setDiscount] = useState(0)
  const [promoError, setPromoError] = useState("")
  const [promoSuccess, setPromoSuccess] = useState("")

  const subtotal = getCartTotal()
  const shipping = getShippingCost()
  const discountAmount = calculateDiscount(subtotal, discount)
  const total = subtotal + shipping - discountAmount

  const handleApplyPromo = () => {
    const promo = Object.values(PROMO_CODES).find((p) => p.code === promoCode.toUpperCase())

    if (promo) {
      setDiscount(promo.discount)
      setPromoSuccess(`Promo code applied! ${promo.discount}% discount`)
      setPromoError("")
    } else {
      setPromoError("Invalid promo code")
      setPromoSuccess("")
      setDiscount(0)
    }
  }

  const handleCheckout = () => {
    navigate(ROUTES.CHECKOUT)
  }

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="empty-cart">
            <h2>Your cart is empty</h2>
            <p>Add some delicious cashews to get started!</p>
            <Button as={Link} to={ROUTES.SHOP} size="lg">
              Start Shopping
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <Link to={ROUTES.SHOP} className="back-link">
            <ArrowLeft size={20} />
            Continue Shopping
          </Link>
          <h1 className="page-title">Shopping Cart</h1>
          <p className="cart-count">You have {cart.length} items in your cart</p>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {cart.map((item) => (
              <Card key={item._id} className="cart-item">
                <div className="item-image">
                  <img src={item.image || "/placeholder.svg"} alt={item.name} />
                </div>

                <div className="item-details">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-price">{formatCurrency(item.price)}</p>
                </div>

                <div className="quantity-controls">
                  <button
                    className="quantity-btn"
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="quantity-display">{item.quantity}</span>
                  <button className="quantity-btn" onClick={() => updateQuantity(item._id, item.quantity + 1)}>
                    <Plus size={16} />
                  </button>
                </div>

                <div className="item-total">{formatCurrency(item.price * item.quantity)}</div>

                <button className="remove-btn" onClick={() => removeFromCart(item._id)}>
                  <Trash2 size={18} />
                </button>
              </Card>
            ))}
          </div>

          <div className="cart-summary">
            <Card className="summary-card">
              <Card.Header>
                <h3>Order Summary</h3>
              </Card.Header>

              <Card.Body>
                <div className="summary-line">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>

                <div className="summary-line">
                  <span>Shipping</span>
                  <span>{formatCurrency(shipping)}</span>
                </div>

                {discount > 0 && (
                  <div className="summary-line discount">
                    <span>Discount ({discount}%)</span>
                    <span>-{formatCurrency(discountAmount)}</span>
                  </div>
                )}

                <div className="summary-line total">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>

                <div className="promo-section">
                  <div className="promo-input-group">
                    <input
                      type="text"
                      className="promo-input"
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <Button onClick={handleApplyPromo} variant="secondary">
                      Apply
                    </Button>
                  </div>

                  {promoError && <p className="promo-error">{promoError}</p>}
                  {promoSuccess && <p className="promo-success">{promoSuccess}</p>}
                </div>
              </Card.Body>

              <Card.Footer>
                <Button onClick={handleCheckout} size="lg" className="checkout-btn">
                  Proceed to Checkout
                </Button>
              </Card.Footer>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
