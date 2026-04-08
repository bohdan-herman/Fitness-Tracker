import { updateProfileNameService } from "../../servises/profileServices/updateProfileNameService.js";

export const updateProfileNameController = async (req, res) => {
  try {
    const profile = await updateProfileNameService(req.user.id, req.body.name);
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      profile,
    });
  } catch (error) {
    const status = error.status || 500;
    const message = error.message || "Error updating profile";
    res.status(status).json({
      success: false,
      message,
    });
  }
};
