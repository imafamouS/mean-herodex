import { HttpHeaders } from '@angular/common/http';

export class HeaderBuilder {

    headerContent: any;

    constructor() {
    }

    getHeaderWithToken(): HttpHeaders {
        let token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Access token not found');
        }

        this.headerContent = {
            'Content-Type': 'application/json',
            'charset': 'UTF-8',
            'token': token
        };

        return new HttpHeaders(this.headerContent);
    }

    getDefaultHeader(): HttpHeaders {
        this.headerContent = {'Content-Type': 'application/json', 'charset': 'UTF-8'};
        return new HttpHeaders(this.headerContent);
    }
}
