import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';

import { UserModel } from '../../../models/index';

declare let $: any;

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

    loginForm: FormGroup;
    username: FormControl;
    password: FormControl;

    constructor(private formBuilder: FormBuilder,
                private authService: AuthService,
                private toast: ToastrService,
                private router: Router) {
    }

    ngOnInit() {
        this.username = new FormControl('', [Validators.required, Validators.minLength(4)]);
        this.password = new FormControl('', [Validators.required]);

        this.loginForm = this.formBuilder.group({
            username: this.username,
            password: this.password
        });
    }

    //Phương thức thực hiện việc gửi request đăng nhập và xử lý kết quả 
    public login() {
        let userModel = new UserModel({
            username: this.loginForm.get('username').value,
            password: this.loginForm.get('password').value,
            role: undefined
        });
        this.authService.login(userModel)
            .subscribe(
                result => this.handlerLoginSuccessfully(result),
                error => this.handlerError(error)
            );
        this.loginForm.reset();
    }

    //Phương thức duoc thực hiện khi đăng nhập thành công 
    private handlerLoginSuccessfully(isLoggedIn) {
        if (isLoggedIn) {
            this.router.navigate(['/']);
            this.toast.success('', 'Login Successful');
            $('#loginModal').modal('toggle');
        } else {
            this.toast.error('', 'Wrong username or password');
        }
    }

    //Phương thức duoc thực hiện khi có lỗi xảy ra 
    private handlerError(err) {
        let jsonResponse = err.error;
        let errors = jsonResponse.errors;
        if (errors) {
            let message = [];
            for (let item of errors) {
                message.push(item.message + '\n');
            }
            this.toast.error('', message.toString());
        } else {
            this.toast.error('', 'Oops! An error has occurred');
        }
    }
}
