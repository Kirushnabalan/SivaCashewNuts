import "./CartItem.css"

function CartItem({ product, onQuantityChange, onRemove }) {
  return (
    <div className="cart-item">
      <img src={product.image || "/placeholder.svg"} alt={product.name} className="cart-item-img" />
      <span className="cart-item-name">{product.name}</span>
      <div className="cart-item-qty">
        <button onClick={() => onQuantityChange(product._id, product.quantity - 1)} disabled={product.quantity <= 1}>
          -
        </button>
        <span>{product.quantity}</span>
        <button onClick={() => onQuantityChange(product._id, product.quantity + 1)}>+</button>
      </div>
      <span className="cart-item-price">₹{product.price}</span>
      <button className="cart-item-remove" onClick={() => onRemove(product._id)}>
        🗑️
      </button>
    </div>
  )
}

export default CartItem
