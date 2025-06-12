const LoadingSpinner = ({ size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "spinner-sm",
    md: "spinner",
    lg: "spinner-lg",
  }

  return (
    <div className={`loading ${className}`}>
      <div className={sizeClasses[size]} />
    </div>
  )
}

export default LoadingSpinner
