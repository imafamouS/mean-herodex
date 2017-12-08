import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../services/user.service';

import { UserModel } from '../../../models/index';

declare let $: any;

@Component({
    selector: 'app-register-form',
    templateUrl: './register-form.component.html',
    styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
    roles = [
        {value: 1, name: 'User'},
        {value: 2, name: 'Admin'}
    ];
    registerForm: FormGroup;
    username: FormControl;
    password: FormControl;


    constructor(private userService: UserService,
                private formBuilder: FormBuilder,
                private toast: ToastrService,
                private router: Router) {
    }

    ngOnInit() {
        this.initForm();
    }

    public register() {
        let userModel: UserModel = new UserModel({
            username: this.username.value,
            password: this.password.value,
            role: this.registerForm.get('role').value === '1' ? 'user' : 'admin'
        });

        this.userService.register(userModel)
            .subscribe(
                result => this.handlerRegisterSuccess(result),
                error => this.handlerRegisterFail(error)
            );
        this.registerForm.reset();
    }

    private initForm() {
        this.username = new FormControl('', [Validators.required, Validators.minLength(4)]);
        this.password = new FormControl('', [Validators.required]);

        this.registerForm = this.formBuilder.group({
            username: this.username,
            password: this.password,
            role: []
        });
    }

    private handlerRegisterSuccess(result) {
        let isSuccess = result.status === 'success';
        let message = result.data.message || result.message;
        if (isSuccess) {
            this.toast.success('', message);
            this.router.navigate(['/']);
            $('#registerModal')
            .modal('toggle');
        } else {
            this.toast.error('', message || 'An error has occurred');
        }
    }

    private handlerRegisterFail(err) {
        let jsonResponse = err.error;
        let errors = jsonResponse.errors;
        if (errors) {
            let message = [];
            for (let item of errors) {
                let msg = item.message || item.username;
                msg += '\n';
                message.push(msg);
            }
            this.toast.error('', message.toString());
        } else {
            this.toast.error('', 'An error has occurred');
        }
    }

}
