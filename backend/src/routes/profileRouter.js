import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { getProfileController } from "../controllers/profileControllers/getProfileController.js";
import { updateProfileNameController } from "../controllers/profileControllers/updateProfileNameController.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";

const router = Router();

router.get("/:id", authMiddleware, asyncHandler(getProfileController));
router.put(
  "/update/name",
  authMiddleware,
  asyncHandler(updateProfileNameController),
);

export default router;
