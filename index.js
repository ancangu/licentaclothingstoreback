import express from "express";
import userRouter from "./routes/users.js"
import bodyParser from "body-parser";
import cors from "cors";
import profile from "./routes/profile.js"
import clothes from "./routes/clothes.js"
import wishlist from "./routes/wishlist.js"
const router = express.Router();
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
const port = process.env.PORT || 3001;
app.use(cors({
  origin: 'http://localhost:3000'
}));



app.use("/users", userRouter);
app.use("/profile",profile);
app.use("/clothes",clothes);
app.use("/wishlist",wishlist);


app.listen(port, "0.0.0.0", () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

