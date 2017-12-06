import { NgModule } from '@angular/core';

import { HeroDashboardComponent } from './hero-dashboard/hero-dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroItemComponent } from './hero-item/hero-item.component';
import { HeroListComponent } from './hero-list/hero-list.component';

import { SharedModule } from '../../shared/shared.module';
import { HeroAddModalComponent } from './hero-add-new/hero-add-modal.component';
import { HeroUpdateComponent } from './hero-update/hero-update.component';

@NgModule({
  imports: [
    SharedModule
  ],
  exports: [
    HeroDashboardComponent
  ],
  declarations: [
    HeroDashboardComponent,
    HeroItemComponent,
    HeroListComponent,
    HeroDetailComponent,
    HeroAddModalComponent,
    HeroAddModalComponent,
    HeroUpdateComponent
  ],

  providers: []
})

export class HeroModule {
}