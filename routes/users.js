import express from "express";
import bodyParser from "body-parser";
import usersController from "../controllers/users.js";

const urlencodedParser = bodyParser.urlencoded({ extended: false });
const router = express.Router();

router.post("/create",urlencodedParser,usersController.createUser);
router.post("/login",urlencodedParser,usersController.getUser);
router.get("/sendemail/:to/:totalvalue",urlencodedParser,usersController.sendEmail)
export default router;