import { AppError } from './app.error';
//Kieu du lieu loi 400
export class BadInputError extends AppError {
    constructor(error) {
        super(error);
    }
}
