import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './containers/home/home.component';

import { HeroDashboardComponent } from './containers/heroes/hero-dashboard/hero-dashboard.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'hero/dashboard', component: HeroDashboardComponent, canActivate: [AuthGuard]},
    {path: '**', redirectTo: 'home'}
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(routes)],
    providers: [AuthGuard],
    bootstrap: [],
    exports: [RouterModule]
})

export class RoutingModule {
}
