export class ApplicationError extends Error {
    constructor(message, statusCode) {
        // console.log(`error ${message}`)
        super(message);
        this.name = "ApplicationError";
        this.statusCode = statusCode;
    }
}

