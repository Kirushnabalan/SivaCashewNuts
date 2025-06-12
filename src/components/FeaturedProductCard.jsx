import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"
import "./FeaturedProductCard.css"

function FeaturedProductCard({ product }) {
  const [qty, setQty] = useState(1)
  const { addToCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleAddToCart = () => {
    if (!user) {
      navigate("/login", { state: { from: window.location.pathname } })
      return
    }
    addToCart({ ...product, quantity: qty })
    setQty(1)
  }

  const isInStock = product.stock > 0

  return (
    <div className="featured-product-card">
      <div className="product-image">
        <img src={product.image || "/placeholder.svg?height=200&width=200"} alt={product.name} />
        {!isInStock && <div className="out-of-stock-overlay">Out of Stock</div>}
      </div>

      <div className="product-info">
        <h4 className="product-name">{product.name}</h4>
        <p className={`stock-status ${!isInStock ? "out-of-stock" : ""}`}>{isInStock ? "In Stock" : "Out of Stock"}</p>
        <div className="product-price">Rs. {product.price.toLocaleString()}.00</div>

        <div className="product-controls">
          <div className="quantity-controls">
            <button type="button" onClick={() => setQty(Math.max(1, qty - 1))} disabled={qty <= 1}>
              -
            </button>
            <span className="quantity">{qty}</span>
            <button type="button" onClick={() => setQty(qty + 1)}>
              +
            </button>
          </div>

          <button className="add-to-cart-btn" onClick={handleAddToCart} disabled={!isInStock}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default FeaturedProductCard
