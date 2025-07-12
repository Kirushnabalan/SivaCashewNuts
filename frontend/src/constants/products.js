import defaultCashewImage from "@assets/chew.png"

export const PRODUCTS = [
  {
    _id: "1",
    name: "Premium Cashew Nuts 1kg",
    price: 6500,
    image: defaultCashewImage,
    inStock: true,
    description: "Premium quality full cashew nuts",
  },
  {
    _id: "2",
    name: "Roasted Cashew Nuts 500g",
    price: 3500,
    image: defaultCashewImage,
    inStock: true,
    description: "Deliciously roasted cashew nuts",
  },
  {
    _id: "3",
    name: "Salted Cashew Nuts 1kg",
    price: 7000,
    image: defaultCashewImage,
    inStock: true,
    description: "Perfectly salted cashew nuts",
  },
  {
    _id: "4",
    name: "Raw Cashew Nuts 500g",
    price: 3000,
    image: defaultCashewImage,
    inStock: false,
    description: "Natural raw cashew nuts",
  },
  {
    _id: "5",
    name: "Honey Roasted Cashews 250g",
    price: 2000,
    image: defaultCashewImage,
    inStock: false,
    description: "Sweet honey roasted cashews",
  },
  {
    _id: "6",
    name: "Spiced Cashew Mix 500g",
    price: 4000,
    image: defaultCashewImage,
    inStock: true,
    description: "Perfectly spiced cashew mix",
  },
]

export const FEATURED_PRODUCTS = PRODUCTS.slice(0, 3)