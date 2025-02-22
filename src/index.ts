import express from "express"
import * as firebaseAdmin from "firebase-admin"
import * as firebaseApp from "firebase/app"
import { routes } from "./routes"
import { errorHandler } from "./middlewares/error-handler.middleware"
import { pageNotFoundHandler } from "./middlewares/page-not-found.middleware"
import { authHandler } from "./middlewares/auth.middleware"

const PORT = process.env.PORT || 8000

firebaseAdmin.initializeApp()
firebaseApp.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
})

const app = express()

authHandler(app)
routes(app)
pageNotFoundHandler(app)
errorHandler(app)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
