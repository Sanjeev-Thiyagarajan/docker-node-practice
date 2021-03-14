const {
  MONGO_IP,
  MONGO_PORT,
  MONGO_USER,
  MONGO_PASSWORD,
  COOKIE_SECURE,
  SESSION_SECRET,
  REDIS_URL,
  REDIS_PORT,
} = require("./config/config");

const express = require("express");
const session = require("express-session");
var cors = require("cors");

const mongoose = require("mongoose");
const redis = require("redis");
let RedisStore = require("connect-redis")(session);
let redisClient = redis.createClient({
  host: REDIS_URL,
  port: REDIS_PORT,
});

const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
console.log(mongoURL);

const connectWithRetry = () => {
  mongoose
    .connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log("successfully connected to mongo DB");
    })
    .catch((e) => {
      console.log(e);
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

app.use(cors({}));

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    cookie: {
      secure: COOKIE_SECURE,
      resave: false,
      saveUninitialized: false,
      httpOnly: true,
      maxAge: 30000,
      // domain: "6a09abe29b9a.ngrok.io",
      sameSite: false,
    },
  })
);
app.use(express.json());

app.use((req, res, next) => {
  next();
});

app.get("/", (req, res) => {
  res.send("<h2>Hi  There!</h2>");
  console.log(req.session);
});

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));
