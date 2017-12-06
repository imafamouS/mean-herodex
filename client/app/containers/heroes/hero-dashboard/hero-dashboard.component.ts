import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-hero-dashboard',
	templateUrl: './hero-dashboard.component.html',
	styleUrls: ['./hero-dashboard.component.css']
})
export class HeroDashboardComponent implements OnInit {
	newHero: any;

	constructor() { }

	ngOnInit() {
	}

	onCreateHeroSuccessfully(heroModel) {
		console.log('FROM DASHBOARD'+ JSON.stringify(heroModel));
		this.newHero = heroModel;
	}
}
