import { AppError } from './app.error';
//Kieu du lieu loi 404
export class NotFoundError extends AppError {
    constructor(error) {
        super(error);
    }
}
