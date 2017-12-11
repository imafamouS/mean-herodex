import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PaginationComponent } from './pagination/pagination.component';
import { SearchComponent } from './search/search.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        PaginationComponent,
        SearchComponent,
        LoadingComponent,
    ],
    declarations: [
        PaginationComponent,
        SearchComponent,
        LoadingComponent,
    ],

    providers: []
})

export class SharedModule {
}
