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
    
    //Phuong thuc duoc thuc hien khi da them moi thanh cong Hero
    //newHero sẽ được thêm mảng các hero tại hero-list.component
    public onCreateHeroSuccessfully(heroModel) {
        this.newHero = heroModel;
    }
}
