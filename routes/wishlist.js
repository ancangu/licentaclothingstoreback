import express from "express";
import bodyParser from "body-parser";
import wishlistController from "../controllers/wishlist.js";

const urlencodedParser = bodyParser.urlencoded({ extended: false });
const router = express.Router();

// router.get("/getarticles",urlencodedParser,clothesController.getFirstArticles);
// router.get("/getarticles/:categoryid/:sex",urlencodedParser,clothesController.getArticlesByFilter);
// router.get("/getarticle/:articleid",urlencodedParser,clothesController.getArticleById);
// router.get("/getavailablesizes/:articleid",urlencodedParser,clothesController.getAvailableSizes);
router.post("/addtowishlist",urlencodedParser,wishlistController.addArticleToWishlist);
router.get("/getitemsfromwishlist",urlencodedParser,wishlistController.getAllItemsFromWishlist);
router.delete("/removeitemfromwishlist/:articleid",urlencodedParser,wishlistController.removeArticleFromWishlist);




export default router;