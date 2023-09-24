const config = {
  port: process.env.PORT || 8000,
  database: process.env.DATABASE || "",
  env: process.env.ENV || "prod",
};

export default config;
