import { Injectable } from '@angular/core';

import { API } from '../app.config';
import { UserModel } from '../models/index';

import { DataService } from './data.service';

@Injectable()
export class UserService {

    constructor(private dataService: DataService) {

    }
    //Phương thức đăng nhập 
    public login(loginModel: UserModel) {
        return this.dataService.post(API.auth.login, JSON.stringify(loginModel));
    }
    
 	//Phương thức đăng ký  
    public register(registerModel: UserModel) {
        return this.dataService.post(API.auth.register, JSON.stringify(registerModel));
    }
}
