import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { DEFAULT_IMAGE_HERO } from '../../../app.config';

import { ToastrService } from 'ngx-toastr';
import { HeroService } from '../../../services/hero.service';

import { HeroModel } from '../../../models/hero.model';

declare let $: any;

@Component({
    selector: 'app-hero-update',
    templateUrl: './hero-update.component.html',
    styleUrls: ['./hero-update.component.css']
})
export class HeroUpdateComponent implements OnInit {
    @Input('hero') hero;
    @Output('onUpdateHeroSuccessfully') onUpdateHeroSuccessfully: EventEmitter<HeroModel> = new EventEmitter<HeroModel>();
    @ViewChild('img') img: ElementRef;

    heroForm: FormGroup;
    name: FormControl;
    id: string;

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
        this.id = "updateHeroModal_" + this.hero._id;
        this.initForm();
    }

    public onImgageError() {
        let inputImg = this.heroForm.get('img').value;
        this.img.nativeElement.src = DEFAULT_IMAGE_HERO;
    }

    public updateHero() {
        let heroModel: HeroModel = this.buildHeroModel();
        if (!heroModel.name) {
            this.toast.warning('', 'Name is required');
            return;
        }
        this.heroService.update(heroModel)
            .subscribe(
                result => {
                    this.handlerUpdateHeroSuccessfully(result, heroModel)
                },
                error => {
                    this.handlerUpdateHeroFailure()
                });

        this.heroForm.reset();
    }

    private handlerUpdateHeroSuccessfully(result, heroModel) {
        let isSuccess = result.status === 'success';

        if (isSuccess) {
            this.toast.success(`Updated hero successfully`);
            $('#updateHeroModal')
            .modal('toggle');

            this.onUpdateHeroSuccessfully.emit(heroModel);
        }
    }

    private handlerUpdateHeroFailure() {
        let message = 'Cannot update Hero! Please try later';

        this.toast.error('', message);
    }

    private buildHeroModel() {
        return new HeroModel({
            id: this.hero._id,
            name: this.name.value,
            universe: this.heroForm.get('universe').value == 1 ? 'DC Comics' : 'Marvel Comics',
            img: this.heroForm.get('img').value || 'assets/img/default-hero.jpg',
            story: this.heroForm.get('story').value
        });
    }

    private initForm() {
        this.name = new FormControl(this.hero.name, [Validators.required]);

        this.heroForm = this.formBuilder.group({
            name: this.name,
            universe: [],
            img: [],
            story: []
        });
    }
}
