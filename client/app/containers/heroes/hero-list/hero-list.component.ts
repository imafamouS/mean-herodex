import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { ToastrService } from 'ngx-toastr';
import { HeroService } from '../../../services/hero.service';

import { HeroModel, JsonResponse } from '../../../models/index';

@Component({
	selector: 'app-hero-list',
	templateUrl: './hero-list.component.html',
	styleUrls: ['./hero-list.component.css']
})
export class HeroListComponent implements OnInit, OnChanges {
	@Input('newHero') newHero: any;

	loading: boolean;
	heroes = [];

	paginationConfig = {
		limit: 18,
		count: 0,
		offset: 0
	}

	constructor(private heroService: HeroService,
		private toast: ToastrService) { }


	ngOnInit() {
		this.getHero(this.paginationConfig.offset, this.paginationConfig.limit);
	}

	ngOnChanges() {
		if (this.newHero != undefined) {
			this.heroes.splice(0, 0, this.newHero);
		}
	}

	public getHero(offset: number, limit: number) {
		this.loading = true;
		this.heroService.getHeroes(offset, limit)
			.subscribe(result => { this.handlerGetHeroSuccessfully(result); },
			error => { this.handlerGetHeroFailure(); });
	}

	public onSearch(term: string) {
		this.loading = true;
		this.heroService.searchHeroes(term)
			.debounceTime(300)
			.distinctUntilChanged()
			.subscribe(result => { this.handlerGetHeroSuccessfully(result); },
			error => { this.handlerGetHeroFailure() });
	}

	public onPageChange(offset) {
		this.paginationConfig.offset = offset;
		this.getHero(this.paginationConfig.offset, this.paginationConfig.limit);
	}

	public onDeleteHeroSuccessfully(hero) {
		let index = this.heroes.indexOf(hero);
		this.heroes.splice(index, 1);
	}

	public onNeedUpdateHero(hero) {
		let index = this.heroes.findIndex(x => x._id == hero._id);
		this.heroes[index] = hero;
	}

	private handlerGetHeroSuccessfully(result) {
		this.paginationConfig.count = result.data.count;
		setTimeout(() => {
			this.loading = false;

			this.heroes = result.data.heroes;
		}, 300);
	}
	private handlerGetHeroFailure() {
		this.toast.error('', 'Cannot get Heroes !');

	}
}
