import { Injectable } from '@angular/core';

import { API } from '../app.config';
import { UserModel } from '../models/index';

import { DataService } from './data.service';

@Injectable()
export class UserService {

    constructor(private dataService: DataService) {

    }

    public login(loginModel: UserModel) {
        return this.dataService.post(API.auth.login, JSON.stringify(loginModel));
    }

    public register(registerModel: UserModel) {
        return this.dataService.post(API.auth.register, JSON.stringify(registerModel));
    }
}
