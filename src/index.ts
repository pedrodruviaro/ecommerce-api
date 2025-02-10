import express from "express"
import { routes } from "./routes"

const PORT = process.env.PORT || 8000
const app = express()

routes(app)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
