export class JsonResponse {
    datetime: any;
    timestamp: number;
    code: number;
    status: string;
    message: string;
    data: any;
    errors: any;

    constructor({datetime, timestamp, code, status, message, data, errors}) {
        this.datetime = datetime;
        this.timestamp = timestamp;
        this.code = code;
        this.status = status;
        this.message = message;
        this.data = data;
        this.errors = errors;
    }
}
