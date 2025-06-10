require('dotenv').config();

const express = require("express")
const app = express()

const cors = require("cors");
const cookieParser = require('cookie-parser');
const rateLimiter = require('express-rate-limit');

// database
const connectDB = require("./db/connect")

// routers
const authRouter = require("./routes/authRoutes")
const userRouter = require("./routes/userRoutes")

// middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.set('trust proxy', 1);

app.use(rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

// app.get("/", (req, res) => {
//   res.send("<p>Welcome</p>")
// })

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/users", userRouter)

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