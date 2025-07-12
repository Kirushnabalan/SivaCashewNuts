import React from 'react';
import './OrderSummary.css';

function OrderSummary({ subtotal, shipping, total, onPlaceOrder, onCancelOrder }) {
  return (
    <div className="order-summary">
      <h3>Order Summary</h3>
      <div className="summary-line"><span>Subtotal</span><span>${subtotal}</span></div>
      <div className="summary-line"><span>Shipping</span><span>${shipping}</span></div>
      <div className="summary-line total"><span>Total (Tax incl.)</span><span>${total}</span></div>

      <div className="promo-code">
        <input placeholder="Enter promo code" />
        <button>Apply</button>
      </div>

      <button className="checkout-btn" onClick={onPlaceOrder}>${total} Checkout →</button>
      <button className="cancel-btn" onClick={onCancelOrder}>Cancel Order</button>
    </div>
  );
}

export default OrderSummary;
