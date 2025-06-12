import { API_BASE_URL } from "@constants"

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("API request failed:", error)
      throw error
    }
  }

  // Products
  async getProducts() {
    return this.request("/products")
  }

  async getProduct(id) {
    return this.request(`/products/${id}`)
  }

  // Orders
  async createOrder(orderData) {
    return this.request("/orders", {
      method: "POST",
      body: JSON.stringify(orderData),
    })
  }

  // Email
  async sendOrderEmail(orderDetails) {
    return this.request("/email/send-order-email", {
      method: "POST",
      body: JSON.stringify({ orderDetails }),
    })
  }

  // Contact
  async sendContactMessage(messageData) {
    return this.request("/contact", {
      method: "POST",
      body: JSON.stringify(messageData),
    })
  }
}

export default new ApiService()
