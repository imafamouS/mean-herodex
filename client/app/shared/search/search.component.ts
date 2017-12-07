import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
    @Output("onSearch") onSearch: EventEmitter<string> = new EventEmitter<string>();

    searchForm: FormGroup;
    subscriptions: Subscription[];

    constructor(private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.searchForm = this.formBuilder.group({
            search: []
        });

        this.subscriptions = [
            this.searchForm.get('search')
                .valueChanges
                .subscribe(value => this.onSearch.emit(value))
        ];
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
}
