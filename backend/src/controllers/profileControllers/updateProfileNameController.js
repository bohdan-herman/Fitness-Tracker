import { updateProfileNameService } from "../../services/profileServices/updateProfileNameService.js";

export const updateProfileNameController = async (req, res) => {
  const profile = await updateProfileNameService(req.user.id, req.body.name);
  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    data: profile,
  });
};
