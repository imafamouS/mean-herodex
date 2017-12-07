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

    public login(usernameAndPassword: UserModel) {
        return this.userService.login(usernameAndPassword)
                   .map(res => {
                       this.handlerLoginSuccessfully(res);
                   });
    }

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

    private setCurrentUser(token: string) {
        let decodedUser = this.decodedUserFromToken(token);
        this.currentUser = this.parseToUserModel(decodedUser);
    }

    private decodedUserFromToken(token: string) {
        return this.jwtHelper.decodeToken(token).user;
    }

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

    private updateStatusUser(user: UserModel) {
        user.role === 'admin' ? this.isAdmin = true : this.isAdmin = false;
    }

}
