import express from "express"
import * as admin from "firebase-admin"
import { routes } from "./routes"
import { errorHandler } from "./middlewares/error-handler.middleware"
import { pageNotFoundHandler } from "./middlewares/page-not-found.middleware"

const PORT = process.env.PORT || 8000

admin.initializeApp()

const app = express()

routes(app)
pageNotFoundHandler(app)
errorHandler(app)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
