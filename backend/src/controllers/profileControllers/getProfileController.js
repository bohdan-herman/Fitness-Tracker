import { getProfileService } from "../../services/profileServices/getProfileService.js";

export const getProfileController = async (req, res) => {
  const profile = await getProfileService(req.params.id);
  res.status(200).json({
    success: true,
    message: "Profile fetched successfully",
    data: profile,
  });
};
