import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderBarComponent } from './containers/header-bar/header-bar.component';
import { FooterBarComponent } from './containers/footer-bar/footer-bar.component';
import { HomeComponent } from './containers/home/home.component';
import { LoginFormComponent } from './containers/login/login-form/login-form.component';
import { LoginModalComponent } from './containers/login/login-modal/login-modal.component';
import { RegisterFormComponent } from './containers/register/register-form/register-form.component';
import { RegisterModalComponent } from './containers/register/register-modal/register-modal.component';

import { RoutingModule } from './routing.module';
import { SharedModule } from './shared/shared.module';
import { HeroModule } from './containers/heroes/hero.module';

import { AppErrorHandler } from './commons/handler-global-error';

import { AuthService, DataService, HeroService, UserService } from './services/index';

import { UpperFirstLetterPipe } from './pipes/index';

import { ToastrModule } from 'ngx-toastr';

@NgModule({
    declarations: [
        AppComponent,
        HeaderBarComponent,
        FooterBarComponent,
        HomeComponent,
        LoginFormComponent,
        LoginModalComponent,
        RegisterFormComponent,
        RegisterModalComponent,

        UpperFirstLetterPipe
    ],
    imports: [
        BrowserModule,
        RoutingModule,
        SharedModule,
        HeroModule,
        ToastrModule.forRoot({
            timeOut: 2000
        })
    ],
    providers: [
        AuthService,
        DataService,
        HeroService,
        UserService,
        {provide: ErrorHandler, useClass: AppErrorHandler},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
