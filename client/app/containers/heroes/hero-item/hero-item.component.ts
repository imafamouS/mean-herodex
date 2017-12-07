import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';

import { DEFAULT_IMAGE_HERO } from '../../../app.config';
import { HeroService } from '../../../services/hero.service';
import { ToastrService } from 'ngx-toastr';

import { HeroModel } from '../../../models/index';

declare let $: any;

@Component({
    selector: 'app-hero-item',
    templateUrl: './hero-item.component.html',
    styleUrls: ['./hero-item.component.css']
})
export class HeroItemComponent implements OnInit {
    @Input('hero') hero;
    @ViewChild('img') img: ElementRef;
    @Output('onDeleteHeroSuccessfully') onDeleteHeroSuccessfully: EventEmitter<HeroModel> = new EventEmitter<HeroModel>();
    @Output('onNeedUpdateHero') onNeedUpdateHero: EventEmitter<HeroModel> = new EventEmitter<HeroModel>();

    constructor(private heroService: HeroService,
                private toast: ToastrService) {
    }

    ngOnInit() {
    }

    public deleteHero() {
        this.heroService.delete(this.hero)
            .subscribe(
                result => {
                    this.onDeleteHeroSuccessfully.emit(this.hero);
                    this.toast.success('', `Deleted ${this.hero.name} successfully`);
                },
                error => {
                    this.toast.error('', `Hero can't delete. Please try later`);
                });
    }

    public useDefaultImage(event) {
        this.img.nativeElement.src = DEFAULT_IMAGE_HERO;
    }

    public onAfterUpdateHeroSuccessfully(hero) {
        this.onNeedUpdateHero.emit(hero);
    }

    public openDetailModal() {
        let idModal = "#detail_" + this.hero._id;
        $(idModal).modal();

    }
}
