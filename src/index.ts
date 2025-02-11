import express from "express"
import * as admin from "firebase-admin"
import { routes } from "./routes"

const PORT = process.env.PORT || 8000

admin.initializeApp()

const app = express()
routes(app)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
