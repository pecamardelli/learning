"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeButton = void 0;
var LikeButton = /** @class */ (function () {
    function LikeButton(_likes, _active) {
        if (_likes === void 0) { _likes = 0; }
        if (_active === void 0) { _active = false; }
        this._likes = _likes;
        this._active = _active;
    }
    Object.defineProperty(LikeButton.prototype, "likeCount", {
        get: function () {
            return this._likes;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LikeButton.prototype, "isActive", {
        get: function () {
            return this._active;
        },
        enumerable: false,
        configurable: true
    });
    LikeButton.prototype.onClick = function () {
        this._likes += (this._active) ? -1 : 1;
        this._active = !this._active;
    };
    return LikeButton;
}());
exports.LikeButton = LikeButton;
