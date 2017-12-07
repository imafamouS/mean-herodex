import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(public auth: AuthService,
                private router: Router) {
    }

    canActivate() {
        if (this.auth.isLoggedin) {
            return true;
        }
        this.router.navigate(['/']);
        return false;
    }
}
