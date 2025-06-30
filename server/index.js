import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"

import emailRoutes from "./routes/emailRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import { errorHandler } from "./middleware/errorHandler.js"
import { logger } from "./middleware/logger.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// ✅ CORS config – allow localhost and vercel frontend
const allowedOrigins = [
  process.env.CORS_ORIGIN,
  "https://siva-cashew-nuts.vercel.app",
  "https://sivacashewnuts2.vercel.app", // Add your actual Vercel domain
  "http://localhost:5173",
  "http://localhost:5174",
]

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, etc.)
      if (!origin) return callback(null, true)

      if (allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        console.log("Blocked origin:", origin)
        callback(new Error("Not allowed by CORS"))
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
)

// ✅ Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(logger)

// ✅ API Routes
app.use("/api/email", emailRoutes)
app.use("/api/products", productRoutes)
app.use("/api/orders", orderRoutes)

// ✅ Production build serve
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../dist")))

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../dist/index.html"))
  })
}

// ✅ Error handler
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})
