"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var PostSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    author: {
        id: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
    },
    likes: {
        type: Array,
    },
    meeting: {
        attending: {
            type: Array,
            required: false,
        },
        date: {
            type: Date,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
        location: {
            city: {
                type: String,
                required: true,
            },
            country: {
                type: String,
                required: true,
            },
            address: {
                type: String,
                required: true,
            },
            place: {
                type: String,
                required: true,
            },
        },
    },
    comments: [
        {
            body: {
                type: String,
                required: true,
            },
            author: {
                id: {
                    type: String,
                    required: true,
                },
                username: {
                    type: String,
                    required: true,
                },
            },
            likes: {
                type: Array,
            },
            created: {
                type: Date,
                default: new Date(Date.now()),
            },
        },
    ],
    slug: {
        type: String,
        required: true,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Post", PostSchema);
//# sourceMappingURL=Post.js.map