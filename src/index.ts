import express from "express"
import type { Response, Request } from "express"

const app = express()

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world!")
})

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
