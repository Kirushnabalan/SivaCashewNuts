import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus } from "lucide-react"
import { useCart } from "@context/CartContext"
import { formatCurrency } from "@utils/helpers"
import Button from "@components/ui/Button"
import Card from "@components/ui/Card"
import PlaceholderImage from '../ui/PlaceholderImage';
import "./ProductCard.css"
const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const { addToCart } = useCart()

  const handleAddToCart = async () => {
    setIsAdding(true)
    addToCart({ ...product, quantity })

    // Reset quantity and show feedback
    setTimeout(() => {
      setQuantity(1)
      setIsAdding(false)
    }, 1000)
  }

  const updateQuantity = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity)
    }
  }

  const isInStock = product.inStock

  return (
    <Card className="product-card">
      <div className="product-image">
        {product.image ? (
          <img 
            src={product.image}
            alt={product.name}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/assets/chew.png';
            }}
          />
        ) : (
          <PlaceholderImage />
        )}
        {!isInStock && <div className="out-of-stock-overlay">Out of Stock</div>}
      </div>

      <Card.Body>
        <h3 className="product-name">{product.name}</h3>
        <p className={`stock-status ${!isInStock ? "out-of-stock" : "in-stock"}`}>
          {isInStock ? "In Stock" : "Out of Stock"}
        </p>
        <div className="product-price">{formatCurrency(product.price)}</div>

        <div className="product-controls">
          <div className="quantity-controls">
            <button className="quantity-btn" onClick={() => updateQuantity(quantity - 1)} disabled={quantity <= 1}>
              <Minus size={16} />
            </button>

            <AnimatePresence mode="wait">
              <motion.span
                key={quantity}
                className="quantity-display"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {quantity}
              </motion.span>
            </AnimatePresence>

            <button className="quantity-btn" onClick={() => updateQuantity(quantity + 1)}>
              <Plus size={16} />
            </button>
          </div>

          <Button onClick={handleAddToCart} disabled={!isInStock} loading={isAdding} className="add-to-cart-btn">
            {isAdding ? "Adding..." : "Add to Cart"}
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default ProductCard
