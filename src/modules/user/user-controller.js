const UserService = require("./user-service");
const { handleError } = require("../../handlers/error-handler");
const logger = require("../../utils/logger");

class UserController {

  // Register new user
  static async register(req, res) {
    try {
      const { password, rePassword, ...rest } = req.body;
      if (password !== rePassword) throw new Error("PASSWORD_MISMATCH");

      const user = await UserService.register({ ...rest, password });
      res.status(201).json({ success: true, message: "Usuario creado exitosamente", user });
    } catch (err) {
      handleError(res, err);
    }
  }

  // Update user
  static async update(req, res) {
    try {
      const { password, rePassword, ...rest } = req.body;
      if (password && password !== rePassword) throw new Error("PASSWORD_MISMATCH");

      const updatedUser = await UserService.update(req.params.id, { ...rest, password });
      res.status(200).json({ success: true, message: "Usuario actualizado", user: updatedUser });
    } catch (err) {
      handleError(res, err);
    }
  }

  // Get all users
  static async getUsers(req, res) {
    try {
      const users = await UserService.getUsers();
      res.status(200).json({ success: true, users });
    } catch (err) {
      handleError(res, err);
    }
  }

  // Delete own user
  static async deleteUser(req, res) {
    try {
      const userId = req.user.user_id; // can only delete itself
      const result = await UserService.delete(userId);
      res.status(200).json({ success: true, message: result.message });
    } catch (err) {
      logger.error(`UserController.deleteUser: ${err.message}`);
      handleError(res, err);
    }
  }
}

module.exports = UserController;
