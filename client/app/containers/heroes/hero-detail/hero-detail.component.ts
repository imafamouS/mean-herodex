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
import { HeroModel } from '../../../models/index';

declare let $: any;

@Component({
    selector: 'app-hero-detail',
    templateUrl: './hero-detail.component.html',
    styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
    @Input('hero') hero;
    @Output('onAfterUpdateHeroSuccessfully') onAfterUpdateHeroSuccessfully: EventEmitter<HeroModel> = new EventEmitter<HeroModel>();
    @ViewChild('img') img: ElementRef;

    id: string;

    constructor() {
    }

    ngOnInit() {
        this.id = "detail" + '_' + this.hero._id;
    }

    public useDefaultImage(event) {
        this.img.nativeElement.src = DEFAULT_IMAGE_HERO;
    }

    public showModalUpdate() {

        let idDetailModal = '#detail_' + this.hero._id;
        let idUpdateModal = '#updateHeroModal_' + this.hero._id;

        $(idDetailModal).modal('hide');

        setTimeout(function() {
            $(idUpdateModal).modal('toggle');
        }, 250);
    }

    public updateHeroSuccessfully(hero) {
        this.onAfterUpdateHeroSuccessfully.emit(hero);
    }
}
