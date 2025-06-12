"use client"

import { motion } from "framer-motion"

const Card = ({ children, className = "", hover = true, ...props }) => {
  const Component = hover ? motion.div : "div"

  return (
    <Component
      className={`card ${className}`}
      whileHover={hover ? { y: -5 } : undefined}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </Component>
  )
}

const CardHeader = ({ children, className = "" }) => <div className={`card-header ${className}`}>{children}</div>

const CardBody = ({ children, className = "" }) => <div className={`card-body ${className}`}>{children}</div>

const CardFooter = ({ children, className = "" }) => <div className={`card-footer ${className}`}>{children}</div>

Card.Header = CardHeader
Card.Body = CardBody
Card.Footer = CardFooter

export default Card
