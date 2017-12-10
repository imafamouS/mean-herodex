import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-header-bar',
    templateUrl: './header-bar.component.html',
    styleUrls: ['./header-bar.component.css']
})
export class HeaderBarComponent implements OnInit {

    constructor(public authService: AuthService,
                private router: Router) {
    }

    ngOnInit() {

    }
    //Phuong phuc Dang xuat
    public logout() {
        this.authService.logout();

        this.router.navigate(['/']);
    }

}
