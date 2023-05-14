import express from "express";
import bodyParser from "body-parser";
import clothesController from "../controllers/clothes.js";

const urlencodedParser = bodyParser.urlencoded({ extended: false });
const router = express.Router();

router.get("/getarticles",urlencodedParser,clothesController.getFirstArticles);
router.get("/getarticles/:categoryid/:sex",urlencodedParser,clothesController.getArticlesByFilter);
router.get("/getarticle/:articleid",urlencodedParser,clothesController.getArticleById);
router.get("/getavailablesizes/:articleid",urlencodedParser,clothesController.getAvailableSizes);


export default router;