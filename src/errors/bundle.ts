import {HttpError} from "routing-controllers";

export class BundleNotFoundError extends HttpError {
    constructor() {
        super(404, "Bundle not found!");
    }
}
