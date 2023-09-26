const config = {
  port: process.env.PORT || 8000,
  database: process.env.DATABASE || "",
  env: process.env.ENV || "prod",
  jwtSecret: process.env.JWT_SECRET || "",
  jwtExpIn: process.env.JWT_EXPIRES_IN || "1d",
  jwtCookie: process.env.JWT_COOKIE || "1",
};

export default config;
