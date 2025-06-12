import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { CheckCircle, Home, ShoppingBag } from "lucide-react"
import { ROUTES } from "@constants"
import Button from "@components/ui/Button"
import "./SuccessPage.css"

const SuccessPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    // Auto redirect after 10 seconds
    const timer = setTimeout(() => {
      navigate(ROUTES.HOME)
    }, 10000)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="success-page">
      <div className="container">
        <motion.div
          className="success-content"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div
            className="success-icon"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <CheckCircle className="w-16 h-16" />
          </motion.div>

          <motion.h1
            className="success-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Order Placed Successfully!
          </motion.h1>

          <motion.p
            className="success-message"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Thank you for your order! We will contact you within one day to confirm your delivery details. Your
            delicious cashews will be on their way soon.
          </motion.p>

          <motion.div
            className="success-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Button onClick={() => navigate(ROUTES.HOME)} size="lg">
              <Home className="w-5 h-5 mr-2" />
              Go to Home
            </Button>

            <Button onClick={() => navigate(ROUTES.SHOP)} variant="secondary" size="lg">
              <ShoppingBag className="w-5 h-5 mr-2" />
              Continue Shopping
            </Button>
          </motion.div>

          <motion.p
            className="redirect-notice"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            You will be automatically redirected to the home page in 10 seconds.
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}

export default SuccessPage
