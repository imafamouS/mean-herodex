import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { DEFAULT_IMAGE_HERO } from '../../../app.config';

import { HeroService } from '../../../services/hero.service';
import { ToastrService } from 'ngx-toastr';

import { HeroModel } from '../../../models/index';
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
		private toast: ToastrService) { }

	ngOnInit() {

	}

	deleteHero() {
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

	useDefaultImage(event) {
		this.img.nativeElement.src = DEFAULT_IMAGE_HERO;
	}

	onAfterUpdateHeroSuccessfully(hero){
		this.onNeedUpdateHero.emit(hero);
	}
}
