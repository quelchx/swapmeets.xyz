"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    verified: {
        type: Boolean,
    },
    bio: {
        type: String,
        required: false,
    },
    city: {
        type: String,
    },
    country: {
        type: String,
    },
    socials: {
        facebook: {
            type: String,
        },
        instagram: {
            type: String,
        },
        twitter: {
            type: String,
        },
        snapchat: {
            type: String,
        },
        tiktok: {
            type: String,
        },
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("User", UserSchema);
//# sourceMappingURL=User.js.map