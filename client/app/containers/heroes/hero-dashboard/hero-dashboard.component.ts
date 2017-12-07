import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-hero-dashboard',
    templateUrl: './hero-dashboard.component.html',
    styleUrls: ['./hero-dashboard.component.css']
})
export class HeroDashboardComponent implements OnInit {
    newHero: any;

    constructor(private titleService: Title) {
    }

    ngOnInit() {
        this.titleService.setTitle('Dashboard');
    }

    public onCreateHeroSuccessfully(heroModel) {
        this.newHero = heroModel;
    }
}
