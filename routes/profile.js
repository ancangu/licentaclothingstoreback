import express from "express";
import bodyParser from "body-parser";
import profileController from "../controllers/profile.js";

const urlencodedParser = bodyParser.urlencoded({ extended: false });
const router = express.Router();

router.get("/district",urlencodedParser,profileController.getDistricts);
router.get("/city/:districtid",urlencodedParser,profileController.getCities);
router.post("/addinitialuserprofile",urlencodedParser,profileController.addUserProfile);
router.patch("/updateuserprofile",urlencodedParser,profileController.updateUserProfile);
router.get("/getuserprofile",urlencodedParser,profileController.getUserProfile);
export default router;