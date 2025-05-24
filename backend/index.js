require('dotenv').config();

const express = require("express")
const app = express()

const cookieParser = require('cookie-parser');

// database
const connectDB = require("./db/connect")

// routers
const authRouter = require("./routes/authRoutes")

// middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
// app.use(cookieParser(process.env.JWT_SECRET));

// app.get("/", (req, res) => {
//   res.send("<p>Welcome</p>")
// })

app.use("/api/v1/auth", authRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => {
      console.log(`Listening to port ${port}`)
    })
  } catch(err) {
    console.log(err)
  }
}

start()