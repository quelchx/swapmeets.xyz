"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var auth_1 = __importDefault(require("../middleware/auth"));
var user_1 = __importDefault(require("../middleware/user"));
var express_1 = __importDefault(require("express"));
var user_controller_1 = require("../controller/user.controller");
var router = express_1.default.Router();
router.put("/:id", user_1.default, auth_1.default, user_controller_1.updateUser);
router.delete("/:id", user_1.default, auth_1.default, user_controller_1.deleteUser);
router.get("/", user_controller_1.getAllUsers);
router.get("/user/:id", user_controller_1.getUserById);
exports.default = router;
//# sourceMappingURL=user.routes.js.map