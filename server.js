const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const session = require("express-session");
const MongoStore = require("connect-mongodb-session")(session);
const { engine } = require("express-handlebars");
const Handlebars = require("handlebars");
const flash = require("connect-flash");
const helmet = require("helmet");
const compression = require("compression");

const homeRoutes = require("./routes/homeRoutes");
const postersRoutes = require("./routes/postersRoutes");
const profileRoutes = require("./routes/profileRoutes");
const authRoutes = require("./routes/authRoutes");
const helpers = require("./utils/hbsHelpers");
const connectDB = require("./config/db");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// DB connect
connectDB();

// Sessions
const store = new MongoStore({
  collection: "session",
  uri: process.env.MONGODB_URL
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store
}));
app.use(flash());
app.use(helmet());
app.use(compression());

// Handlebars setup
helpers(Handlebars);
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/", homeRoutes);
app.use("/posters", postersRoutes);
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

// Server
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
