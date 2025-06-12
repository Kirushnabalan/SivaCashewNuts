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
  [import.meta.env.VITE_PROMO_CODE_WELCOME]: { 
    code: import.meta.env.VITE_PROMO_CODE_WELCOME, 
    discount: Number(import.meta.env.VITE_PROMO_DISCOUNT_WELCOME) 
  },
  [import.meta.env.VITE_PROMO_CODE_CASHEW]: { 
    code: import.meta.env.VITE_PROMO_CODE_CASHEW, 
    discount: Number(import.meta.env.VITE_PROMO_DISCOUNT_CASHEW) 
  },
}

export const SHIPPING_COST = 4

export const CONTACT_INFO = {
  phone: "+94 778042144",
  whatsapp: "+94 778042144",
  email: "kirushnabalan1803@gmail.com",
  location: "Sri Lanka"
}
