
// The class name should be using Pascal naming conventin and have the suffix 'Component'.
export class LikeComponent {
    constructor(private _likes: number = 0, private _active: boolean = false) {}

    get likeCount() {
        return this._likes;
    }

    get isActive() {
        return this._active;
    }

    onClick() {
        this._likes  += (this._active) ? -1: 1;
        this._active = !this._active;
    }
}