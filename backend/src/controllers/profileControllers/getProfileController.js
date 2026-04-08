import { getProfileService } from "../../servises/profileServices/getProfileService.js";

export const getProfileController = async (req, res) => {
  try {
    const profile = await getProfileService(req.params.id);
    res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      profile,
    });
  } catch (error) {
    const status = error.status || 500;
    const message = error.message || "Error fetching profile";
    res.status(status).json({
      success: false,
      message,
    });
  }
};
