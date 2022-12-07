import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import UserRoute from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";

dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
  db: db,
});

// (async () => {
//   await db.sync();
// })();

try {
  await db.authenticate();
  console.log("Database connected...");
} catch (error) {
  console.log(error);
}

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
    },
  })
);
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(AuthRoute);
app.use(UserRoute);
app.use(ProductRoute);

// store.sync();

app.listen(process.env.APP_PORT, () => {
  console.log("Server running at port 5000");
});
