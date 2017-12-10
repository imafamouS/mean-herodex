import { AppError } from './app.error';
//Kieu du lieu loi 401
export class UnauthorizedError extends AppError {
    constructor(error) {
        super(error);
    }
}
