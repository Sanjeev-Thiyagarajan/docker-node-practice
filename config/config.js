module.exports = {
  MONGO_IP: process.env.MONGO_IP || "mongo",
  MONGO_PORT: process.env.MONGO_PORT || 27017,
  MONGO_USER: process.env.MONGO_USER,
  MONGO_PASSWORD: process.env.MONGO_PASSWORD,
  SESSION_SECRET: process.env.SESSION_SECRET,
  //   COOKIE_SECURE: process.env.NODE_ENV === "production" ? true : false,
  COOKIE_SECURE: false,
  REDIS_URL: process.env.REDIS_URL || "redis",
  REDIS_PORT: process.env.REDIS_PORT || 6379,
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:3001",
};
