import { forwardRef } from "react"

const Input = forwardRef(({ label, error, className = "", ...props }, ref) => {
  return (
    <div className="form-group">
      {label && <label className="form-label">{label}</label>}
      <input ref={ref} className={`form-input ${error ? "border-red-500" : ""} ${className}`} {...props} />
      {error && <div className="form-error">{error}</div>}
    </div>
  )
})

Input.displayName = "Input"

export default Input
