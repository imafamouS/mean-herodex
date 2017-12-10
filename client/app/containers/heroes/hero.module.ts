import { NgModule } from '@angular/core';

import { HeroDashboardComponent } from './hero-dashboard/hero-dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroItemComponent } from './hero-item/hero-item.component';
import { HeroListComponent } from './hero-list/hero-list.component';
import { HeroAddModalComponent } from './hero-add-new/hero-add-modal.component';
import { HeroUpdateComponent } from './hero-update/hero-update.component';

import { SharedModule } from '../../shared/shared.module';

import { LimitStringPipe } from '../../pipes/index';

@NgModule({
    imports: [
        //Module duoc dung trong HeroModule
        SharedModule,
    ],
    exports: [
         //Component se duoc cac module khac xu dung
        HeroDashboardComponent,
    ],
    declarations: [
        //Cac component, pipe duoc xu dung trong HeroModule
        HeroDashboardComponent,
        HeroItemComponent,
        HeroListComponent,
        HeroDetailComponent,
        HeroAddModalComponent,
        HeroAddModalComponent,
        HeroUpdateComponent,
        LimitStringPipe
    ],
    //Cac item se duoc tu dong khoi tao thong qua Dependency Injection
    providers: [LimitStringPipe]
})

export class HeroModule {
}
