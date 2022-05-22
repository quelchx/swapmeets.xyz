"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.likePostComment = exports.addUserToMeeting = exports.removeUserFromMeeting = exports.likePost = exports.deleteComment = exports.updateCommentOnPost = exports.commentOnPost = exports.getPostBySlug = exports.getPostById = exports.getAllPosts = exports.deletePost = exports.updatePost = exports.createPost = void 0;
// import { createClient } from "redis";
var Post_1 = __importDefault(require("../models/Post"));
// const client = createClient();
// client.connect();
// client.on("error", () => console.error);
/** @POST /posts */
var createPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newPost, savedPost, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                newPost = new Post_1.default(req.body);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, newPost.save()];
            case 2:
                savedPost = _a.sent();
                return [2 /*return*/, res.status(200).json(savedPost)];
            case 3:
                err_1 = _a.sent();
                return [2 /*return*/, res.status(500).json({ error: err_1 })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createPost = createPost;
/** @PUT /posts/<post._id> */
var updatePost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, updatePost_1, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Post_1.default.findByIdAndUpdate(id, { $set: req.body }, { new: true })];
            case 2:
                updatePost_1 = _a.sent();
                return [2 /*return*/, res.status(200).json(updatePost_1)];
            case 3:
                err_2 = _a.sent();
                console.log(err_2);
                return [2 /*return*/, res.status(404).json({ error: err_2 })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updatePost = updatePost;
/** @DELETE /posts/<post._id> */
var deletePost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, deletedPost, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Post_1.default.findByIdAndDelete(id)];
            case 2:
                deletedPost = _a.sent();
                if (!deletedPost) {
                    return [2 /*return*/, res.status(404).json({ error: "Post does not exist" })];
                }
                else {
                    return [2 /*return*/, res.status(200).json({ message: "Post has been deleted" })];
                }
                return [3 /*break*/, 4];
            case 3:
                err_3 = _a.sent();
                console.error(err_3);
                return [2 /*return*/, res.json(404).json({ error: err_3 })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deletePost = deletePost;
/** @GET /posts (optional) /posts?limit=<number>&title=<post.title> */
var getAllPosts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, limit, other, posts, err_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.query, limit = _a.limit, other = __rest(_a, ["limit"]);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Post_1.default.find(__assign({}, other)).limit(parseInt(limit))];
            case 2:
                posts = _b.sent();
                // one minute cache time limit -- posts update, but to limit calls to mongo atlas, cache is in place to hold data
                // client.setEx("posts", 60, JSON.stringify(posts));
                return [2 /*return*/, res.status(200).json(posts)];
            case 3:
                err_4 = _b.sent();
                return [2 /*return*/, res.status(404).json({ error: err_4 })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getAllPosts = getAllPosts;
/** @GET /posts/<post._id> */
var getPostById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, post, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Post_1.default.findById(id)];
            case 2:
                post = _a.sent();
                // client.setEx(id, 60, JSON.stringify(post));
                return [2 /*return*/, res.status(200).json(post)];
            case 3:
                err_5 = _a.sent();
                return [2 /*return*/, res.status(404).json({ error: err_5 })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getPostById = getPostById;
var getPostBySlug = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, post, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Post_1.default.findOne({ "post.slug": id })];
            case 2:
                post = _a.sent();
                return [2 /*return*/, res.status(200).json(post)];
            case 3:
                err_6 = _a.sent();
                return [2 /*return*/, res.status(404).json({ error: err_6 })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getPostBySlug = getPostBySlug;
/** @PUT /posts/comment/<post._id> */
var commentOnPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, post, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Post_1.default.findByIdAndUpdate(id, {
                        $push: { comments: req.body },
                    }, { new: true })];
            case 2:
                post = _a.sent();
                return [2 /*return*/, res.status(200).json(post)];
            case 3:
                err_7 = _a.sent();
                return [2 /*return*/, res
                        .status(404)
                        .json({ error: "Something went wrong generating a new comment" })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.commentOnPost = commentOnPost;
/** @PUT /posts/update-comment/<post._id> */
var updateCommentOnPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, body, author, post, err_8;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, id = _a.id, body = _a.body, author = _a.author;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Post_1.default.updateOne({
                        _id: req.params.id,
                        "comments.$._id": id,
                        "comments.author.id": author,
                    }, {
                        $set: { "comments.$.body": body },
                    }, { new: true })];
            case 2:
                post = _b.sent();
                return [2 /*return*/, res.status(200).json(post)];
            case 3:
                err_8 = _b.sent();
                return [2 /*return*/, res
                        .status(404)
                        .json({ error: "Something went wrong trying to update the comment" })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateCommentOnPost = updateCommentOnPost;
/** @DELETE /posts/comments/<post._id>?comment=<comment_id> */
var deleteComment = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var comment, post, err_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                comment = req.query.comment;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Post_1.default.updateOne({
                        _id: req.params.id,
                    }, {
                        $pull: { comments: { _id: comment } },
                    }, { upsert: false, multi: true })];
            case 2:
                post = _a.sent();
                return [2 /*return*/, res.status(200).json(post)];
            case 3:
                err_9 = _a.sent();
                return [2 /*return*/, res
                        .status(404)
                        .json({ error: "Something went wrong deleting this comment" })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteComment = deleteComment;
/** @PUT /posts/like/<post._id> */
var likePost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, post, err_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                user = req.body.user;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Post_1.default.findByIdAndUpdate(id, { $addToSet: { likes: user } }, { new: true })];
            case 2:
                post = _a.sent();
                return [2 /*return*/, res.status(200).json(post)];
            case 3:
                err_10 = _a.sent();
                return [2 /*return*/, res.status(404).json({ error: err_10 })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.likePost = likePost;
/** @PUT /posts/<post._id>/meeting/remove */
var removeUserFromMeeting = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, post, err_11;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                user = req.body.user;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Post_1.default.updateOne({ _id: id }, {
                        $pull: { "meeting.attending": user },
                    }, { new: true })];
            case 2:
                post = _a.sent();
                return [2 /*return*/, res.status(200).json(post)];
            case 3:
                err_11 = _a.sent();
                return [2 /*return*/, res.status(404).json({ error: err_11.message })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.removeUserFromMeeting = removeUserFromMeeting;
/** @PUT /posts/<post._id>/meeting */
var addUserToMeeting = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, post, err_12;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                user = req.body.user;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Post_1.default.findByIdAndUpdate(id, {
                        $addToSet: { "meeting.attending": user },
                    }, { new: true })];
            case 2:
                post = _a.sent();
                return [2 /*return*/, res.status(200).json(post)];
            case 3:
                err_12 = _a.sent();
                return [2 /*return*/, res.status(404).json({ error: err_12.message })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.addUserToMeeting = addUserToMeeting;
/** @PUT /posts/<post._id>/like-comment */
var likePostComment = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, comment, post, err_13;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                comment = req.body.comment;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Post_1.default.updateOne({
                        _id: id,
                        "comments._id": comment,
                    }, { $addToSet: { "comments.$.likes": req.body.user } }, { new: true })];
            case 2:
                post = _a.sent();
                return [2 /*return*/, res.status(200).json(post)];
            case 3:
                err_13 = _a.sent();
                return [2 /*return*/, res
                        .status(404)
                        .json({ error: "Something went wrong liking this post" })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.likePostComment = likePostComment;
//# sourceMappingURL=post.controller.js.map