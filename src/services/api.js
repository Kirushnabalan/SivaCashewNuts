import { API_BASE_URL } from "@constants"

const apiService = {
  async request(endpoint, options = {}) {
    const url = `${import.meta.env.VITE_API_BASE_URL}${endpoint}`
    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      credentials: "include",
      ...options,
    }

    try {
      const response = await fetch(url, config)

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || `HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("API request failed:", error)
      throw error
    }
  },

  // Products
  async getProducts() {
    return this.request("/products")
  },

  async getProduct(id) {
    return this.request(`/products/${id}`)
  },

  // Orders
  async createOrder(orderData) {
    return this.request("/orders", {
      method: "POST",
      body: JSON.stringify(orderData),
    })
  },

  // Email
  async sendOrderEmail(orderData) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/email/send-order-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send order email');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw new Error('Failed to process order. Please try again or contact support.');
    }
  },

  // Contact
  async sendContactMessage(messageData) {
    return this.request("/contact", {
      method: "POST",
      body: JSON.stringify(messageData),
    })
  }
}

export default apiService
