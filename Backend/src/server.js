require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const cookieParser = require("cookie-parser");
const connectDatabase = require("./config/db");
const swaggerDocs = require("./swaggerConfig");
const path = require("path");

const app = express();

// Security headers
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));

// Request limits & protection
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());
app.use(mongoSanitize());

// Swagger Docs (only enable in development)
if (process.env.NODE_ENV !== "production") {
  swaggerDocs(app);
}

// CORS settings
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",")
  : ["http://localhost:3000"]; // Vite default

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Connect DB
connectDatabase();

// Routes
const routes = {
  auth: require("./routes/authRoutes"),
  products: require("./routes/productRoutes"),
  users: require("./routes/customerRoutes"),
  admin: require("./routes/adminRoutes"),
  seller: require("./routes/sellerRoutes"),
  cart: require("./routes/cartRoutes"),
  orders: require("./routes/orderRoutes"),
  payments: require("./routes/paymentRoutes"),
  wallet: require("./routes/walletRoutes"),
};

Object.entries(routes).forEach(([key, route]) => {
  app.use(`/api/${key}`, route);
});

// Serve Vite build in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../Frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend/dist/index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Secure E-Commerce API Running...");
  });
}

// 404
app.use((req, res, next) => {
  res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
