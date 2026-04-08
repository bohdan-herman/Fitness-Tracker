import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { getProfileController } from "../controllers/profileControllers/getProfileController.js";
import { updateProfileNameController } from "../controllers/profileControllers/updateProfileNameController.js";

const router = Router();

router.get("/:id", getProfileController);
router.put("/update/name", authMiddleware, updateProfileNameController);

export default router;
