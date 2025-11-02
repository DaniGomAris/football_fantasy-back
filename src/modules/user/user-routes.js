const express = require("express");
const router = express.Router();
const { validToken } = require("../../middlewares/jwt-middleware");
const { authorizeRoles } = require("../../middlewares/role-middleware");
const UserController = require("./user-controller");

// Create user (POST /user/register)
router.post("/register", UserController.register);

// Update user (PUT /user/:id)
router.put("/:id", validToken, authorizeRoles(["admin", "user"]), UserController.update);

// Get all users (GET /user/get-users)
router.get("/get-users", validToken, authorizeRoles(["user"]), UserController.getUsers);

// Delete own user (DELETE user/delete-me)
router.delete("/delete-me", validToken, authorizeRoles(["user", "user"]), UserController.deleteUser);
module.exports = router;
