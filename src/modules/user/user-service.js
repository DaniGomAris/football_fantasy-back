const User = require("./models/user");
const Cart = require("../cart/models/cart");
const { validateUser } = require("./validators/user-validator");
const { hashPassword } = require("../auth/strategies/password-strategy");
const logger = require("../../utils/logger");

class UserService {

  // Register new user
  static async register(data) {
    validateUser(data);

    const existingById = await User.findById(data._id);
    if (existingById) throw new Error("ID EXISTS");

    const existingByEmail = await User.findOne({ email: data.email });
    if (existingByEmail) throw new Error("EMAIL EXISTS");

    data.password = await hashPassword(data.password);

    const user = new User({ ...data, role: "user" });
    await user.save();

    const { password, ...userWithoutPassword } = user.toObject();
    return userWithoutPassword;
  }

  // Update user
  static async update(userId, updates) {
    const user = await User.findById(userId);
    if (!user) throw new Error("USER NOT FOUND");

    const allowedFields = ["name","last_name1","last_name2","email","phone","password"];
    const invalidFields = Object.keys(updates).filter(f => !allowedFields.includes(f));
    if (invalidFields.length) throw new Error("FIELDS NOT UPDATABLE");

    const dataToValidate = { ...user.toObject(), ...updates, password: updates.password, rePassword: updates.password };
    validateUser(dataToValidate);

    for (const field of allowedFields) {
      if (updates[field] !== undefined) {
        user[field] = field === "password" ? await hashPassword(updates.password) : updates[field];
      }
    }

    await user.save();
    const { password, ...userWithoutPassword } = user.toObject();
    return userWithoutPassword;
  }

  // Get all userss
  static async getUsers() {
    return await User.find({ role: "user" })
      .select("-password")
      .lean();
  }

  // Delete user
  static async delete(userId) {
    const user = await User.findById(userId);
    if (!user) throw new Error("USER NOT FOUND");

    await User.findByIdAndDelete(userId);
    return { message: "Usuario eliminado correctamente" };
  }
}

module.exports = UserService;
