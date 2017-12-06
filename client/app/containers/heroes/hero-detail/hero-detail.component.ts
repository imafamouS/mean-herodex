import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
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
	constructor() { }

	ngOnInit() {
	}

	public useDefaultImage(event) {
		this.img.nativeElement.src = DEFAULT_IMAGE_HERO;
	}
	public showModalUpdate() {
		$("#detail").modal('toggle');
		setTimeout(function() {
			$("#updateHeroModal").modal();
		}, 250);
	}

	public updateHeroSuccessfully(hero) {
		this.onAfterUpdateHeroSuccessfully.emit(hero);
	}
}
