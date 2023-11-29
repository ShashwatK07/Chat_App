import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import UserRoute from "./routes/userRoutes.js";
import AuthRoute from "./routes/authRoutes.js";
import ConversationRoute from "./routes/conversationRoutes.js";
import MessageRoute from "./routes/messageRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";

const app = express();
dotenv.config();
app.use(
  cors({
    allowedHeaders: "*",
    allowedMethods: "*",
    origin: "*",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

// const USERNAME = process.env.DB_USERNAME;
// const PASSWORD = process.env.DB_PASSWORD;
// const dbUrl = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.i2oefwm.mongodb.net/`;
const dbUrl = `mongodb+srv://shshwtkpr:shashwat7755@cluster0.i2oefwm.mongodb.net/;`;
// const dbUrl2 = `mongodb+srv://mradul:6OqDTxq8L36e605L@cluster0.r4tjshm.mongodb.net/`;

mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("\nOH NO ERROR!!!\n");
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Welcome to backend of our website");
});

app.use("/", AuthRoute);
app.use("/", UserRoute);
app.use("/", ConversationRoute);
app.use("/", MessageRoute);

app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

app.all("*", (req, res, next) => {
  res.status(404).json({ error: "Page not found!" });
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Oh no, something went wrong!";
  res.status(statusCode).json({ error: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening Port ${port}`);
});
