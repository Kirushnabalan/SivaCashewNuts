/**
 * Format currency value
 */
export const formatCurrency = (amount) => {
  return `₹${amount.toLocaleString()}`
}

/**
 * Calculate discount amount
 */
export const calculateDiscount = (subtotal, discountPercentage) => {
  return (subtotal * discountPercentage) / 100
}

/**
 * Validate email format
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate phone number (10 digits)
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^\d{10}$/
  return phoneRegex.test(phone)
}

/**
 * Generate WhatsApp URL
 */
export const generateWhatsAppURL = (phone, message) => {
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${phone}?text=${encodedMessage}`
}

/**
 * Debounce function
 */
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Local storage helpers
 */
export const storage = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch (error) {
      console.error("Error getting from localStorage:", error)
      return null
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error("Error setting to localStorage:", error)
    }
  },
  remove: (key) => {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error("Error removing from localStorage:", error)
    }
  },
}
