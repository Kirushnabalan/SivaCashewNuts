import { useState } from "react"
import { storage } from "@utils/helpers"

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = storage.get(key)
      return item !== null ? item : initialValue
    } catch (error) {
      console.error("Error reading from localStorage:", error)
      return initialValue
    }
  })

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      storage.set(key, valueToStore)
    } catch (error) {
      console.error("Error setting localStorage:", error)
    }
  }

  return [storedValue, setValue]
}
