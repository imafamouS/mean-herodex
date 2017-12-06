import { AppError } from './app.error';

export class BadInputError extends AppError {
	constructor(error) {
		super(error);
	}
}