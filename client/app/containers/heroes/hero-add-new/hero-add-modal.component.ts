import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { HeroService } from '../../../services/hero.service';
import { HeroModel } from '../../../models/hero.model';

declare let $: any;

@Component({
    selector: 'app-hero-add-modal',
    templateUrl: './hero-add-modal.component.html',
    styleUrls: ['./hero-add-modal.component.css']
})
export class HeroAddModalComponent implements OnInit {
    @Output('onCreateHeroSuccessfully') onCreateHeroSuccessfully: EventEmitter<HeroModel> = new EventEmitter<HeroModel>();

    heroForm: FormGroup;
    name: FormControl;

    universes = [
        {value: 1, name: 'DC Comics'},
        {value: 2, name: 'Marvel Comics'}
    ];

    constructor(private formBuilder: FormBuilder,
                private router: Router,
                private heroService: HeroService,
                private toast: ToastrService) {
    }

    ngOnInit() {
        this.initForm();
    }

    public createHero() {
        let heroModel: HeroModel = this.buildHeroModel();
        if (!heroModel.name) {
            this.toast.warning('', 'Name is required');
            return;
        }
        this.heroService.create(heroModel)
            .subscribe(
                result => {
                    this.handlerCreateHeroSuccessfully(result, heroModel);
                },
                error => {
                    this.handlerCreateHeroFailure();
                });

        this.heroForm.reset();
    }

    private handlerCreateHeroSuccessfully(result, heroModel) {
        let id = result.data._id;
        if (id) {
            heroModel._id = id;
            this.toast.success(`Created ${heroModel.name} hero successfully`);
            $('#addHeroModal')
            .modal('toggle');

            this.onCreateHeroSuccessfully.emit(heroModel);
        }
    }

    private handlerCreateHeroFailure() {
        let message = 'Cannot create new Hero! Please try later';

        this.toast.error('', message);
    }

    private buildHeroModel() {
        return new HeroModel({
            id: undefined,
            name: this.name.value,
            universe: this.heroForm.get('universe').value === 1 ? 'DC Comics' : 'Marvel Comics',
            img: this.heroForm.get('img').value || 'assets/img/default-hero.jpg',
            story: this.heroForm.get('story').value
        });
    }

    private initForm() {
        this.name = new FormControl('', [Validators.required]);

        this.heroForm = this.formBuilder.group({
            name: this.name,
            universe: [],
            img: [],
            story: []
        });
    }
}
