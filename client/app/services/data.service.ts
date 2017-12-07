import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import * as HandlerError from '../commons/handler-error';
import { HeaderBuilder } from '../commons/header-request-builder';

@Injectable()
export class DataService {

    private headerBuilder: HeaderBuilder = new HeaderBuilder();

    constructor(private http: HttpClient) {
    }

    public get(url: string, header?: HttpHeaders) {
        let options = header || this.headerBuilder.getDefaultHeader();
        return this.http.get(url, {headers: options})
                   .catch(error => HandlerError.handler(error));
    }

    public post(url: string, body?: any, header?: HttpHeaders) {
        let options = header || this.headerBuilder.getDefaultHeader();
        return this.http.post(url, body, {headers: options})
                   .catch(error => HandlerError.handler(error));
    }

    public put(url: string, body: any, header?: HttpHeaders) {
        let options = header || this.headerBuilder.getDefaultHeader();
        return this.http.put(url, body, {headers: options})
                   .catch(error => HandlerError.handler(error));
    }

    public delele(url: string, body: any, header?: HttpHeaders) {
        let options = header || this.headerBuilder.getDefaultHeader();
        let _id = body;

        return this.http.delete(url + '/' + _id, {headers: options})
                   .catch(error => HandlerError.handler(error));
    }

    public create(url: string, body: any, header?: HttpHeaders) {
        return this.post(url, body, header);
    }

    public update(url: string, body: any, header?: HttpHeaders) {
        return this.put(url, body, header);
    }
}
