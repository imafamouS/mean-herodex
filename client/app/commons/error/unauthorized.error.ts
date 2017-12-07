import { AppError } from './app.error';

export class UnauthorizedError extends AppError {
    constructor(error) {
        super(error);
    }
}
