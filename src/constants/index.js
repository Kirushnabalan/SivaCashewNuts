export * from "./products"
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api"

export const ROUTES = {
  HOME: "/",
  SHOP: "/shop",
  ABOUT: "/about",
  CONTACT: "/contact",
  CART: "/cart",
  CHECKOUT: "/checkout",
  SUCCESS: "/success",
}

export const PROMO_CODES = {
  WELCOME10: { code: "WELCOME10", discount: 10 },
  CASHEW20: { code: "CASHEW20", discount: 20 },
}

export const SHIPPING_COST = 4

export const CONTACT_INFO = {
  phone: "+94 778042144",
  whatsapp: "+94 778042144", // Without + for WhatsApp
  email: "kirushnabalan1803@gmail.com",
  location: "Sri Lanka"
}
