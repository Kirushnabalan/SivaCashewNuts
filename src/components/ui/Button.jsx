"use client"

import { forwardRef } from "react"
import { motion } from "framer-motion"

const Button = forwardRef(
  (
    {
      children,
      variant = "primary",
      size = "md",
      disabled = false,
      loading = false,
      className = "",
      onClick,
      as: Component = "button",
      ...props
    },
    ref,
  ) => {
    const baseClasses = "btn"
    const variantClasses = {
      primary: "btn-primary",
      secondary: "btn-secondary",
      success: "btn-success",
      danger: "btn-danger",
    }

    const sizeClasses = {
      sm: "btn-sm",
      md: "",
      lg: "btn-lg",
    }

    const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`

    return (
      <motion.div whileHover={{ scale: disabled ? 1 : 1.02 }} whileTap={{ scale: disabled ? 1 : 0.98 }}>
        <Component ref={ref} className={classes} disabled={disabled || loading} onClick={onClick} {...props}>
          {loading ? <div className="spinner" /> : children}
        </Component>
      </motion.div>
    )
  },
)

Button.displayName = "Button"

export default Button
