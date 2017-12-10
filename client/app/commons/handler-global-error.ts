import { ErrorHandler } from '@angular/core';
//Lop xu ly loi toan cuc phia Client
export class AppErrorHandler implements ErrorHandler {

    handleError(error) {
        console.log(error.message || error);
    }
}
