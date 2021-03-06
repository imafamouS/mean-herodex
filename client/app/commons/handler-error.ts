import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http';

import 'rxjs/add/observable/throw';

import { AppError, BadInputError, NotFoundError, UnauthorizedError } from './error/index';
import { JsonResponse } from '../models/index';
//Ham xu ly loi khi nhan response tu phia Server
export function handler(error: HttpErrorResponse) {
    let jsonResponse: JsonResponse = error.error;
    if (error.status === 400) {
        return Observable.throw(new BadInputError(jsonResponse || 'Oops! An error has occurred'));
    }

    if (error.status === 401) {
        return Observable.throw(new UnauthorizedError(jsonResponse || 'UNAUTHORIZED'));
    }

    if (error.status === 404) {
        return Observable.throw(new NotFoundError(jsonResponse || 'Not found'));
    }

    return Observable.throw(new AppError(jsonResponse));
}
