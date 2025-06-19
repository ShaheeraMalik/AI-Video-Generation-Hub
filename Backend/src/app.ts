// backend/src/app.ts
import express from 'express'
import cors from 'cors'
import path from 'path'
import marketingRoutes from './routes/marketing'
import tourRoutes from './routes/tour'
import { errorHandler } from './utils/errorHandler'

const app = express()

// 1) CORS for Next.js/frontend
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  })
)

// 2) JSON parser (for /tour and status routes)
app.use(express.json())

// 3) Serve static marketing image(s)
app.use('/images', express.static(path.join(__dirname, 'images')))

// 4a) Mount marketing routes (multer now in routes/marketing.ts)
app.use('/api/video/marketing', marketingRoutes)

// 4b) Mount tour routes (JSON only)
app.use('/api/video/tour', tourRoutes)

// 5) Global error handler
app.use(errorHandler)

export default app
