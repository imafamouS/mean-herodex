import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { JwtHelper } from 'angular2-jwt';

import 'rxjs/add/operator/map';

import { UserService } from './user.service';
import { UserModel } from '../models/index';

@Injectable()
export class AuthService implements OnInit {
    jwtHelper: JwtHelper = new JwtHelper();

    currentUser: UserModel;
    isAdmin: boolean = false;
    isLoggedin: boolean = false;

    constructor(private userService: UserService,
                private router: Router) {

        let token = localStorage.getItem('token');
        try {
            if (token) {
                this.setCurrentUser(token);
                this.updateStatusUser(this.currentUser);
                this.isLoggedin = true;
            }
        } catch (err) {
            //throw new Error('An error has occurred');
        }
    }

    ngOnInit() {

    }

    //Phuong thuc trung gian trong qua trinh gui va nhan request login
    public login(usernameAndPassword: UserModel) {
        return this.userService.login(usernameAndPassword)
                   .map(res => {
                       return this.handlerLoginSuccessfully(res);
                   });
    }

    //Phuong thuc dang xuat
    public logout() {
        this.isLoggedin = false;
        this.currentUser = new UserModel({
            username: '',
            password: undefined,
            role: ''
        });
        localStorage.removeItem('token');
        this.router.navigate(['/']);
    }

    //Phuong thuc trung gian khi dang nhap thanh cong
    //Them token vao localStorage va cap nhat currentUser
    private handlerLoginSuccessfully(res) {
        if (res.status === 'success' && res.data) {
            let token = res.data.token;
            if (!token) {
                Observable.throw(new Error());
                return;
            }
            localStorage.setItem('token', token);

            this.setCurrentUser(token);
            this.updateStatusUser(this.currentUser);

            this.isLoggedin = true;

            return this.isLoggedin;
        }
    }

    //Cap nhat currentUser tu token
    private setCurrentUser(token: string) {
        let decodedUser = this.decodedUserFromToken(token);
        this.currentUser = this.parseToUserModel(decodedUser);
    }

    //Giai ma user tu token
    private decodedUserFromToken(token: string) {
        return this.jwtHelper.decodeToken(token).user;
    }

    //Tao UserModel tu user da duoc giai ma
    private parseToUserModel(decodedUser): UserModel {
        let username = decodedUser.username;
        let role = decodedUser.role;
        let _id = decodedUser._id;

        let user = new UserModel({
            username: username,
            password: undefined,
            role: role
        });
        user._id = _id;

        return user;
    }
    
    //Cap nhat trang thai user
    private updateStatusUser(user: UserModel) {
        user.role === 'admin' ? this.isAdmin = true : this.isAdmin = false;
    }

}
