import { Component, Input, OnChanges, OnInit } from '@angular/core';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { ToastrService } from 'ngx-toastr';
import { HeroService } from '../../../services/hero.service';

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
                private toast: ToastrService) {
    }

    ngOnInit() {
        this.getHero(this.paginationConfig.offset, this.paginationConfig.limit);
    }
    
    //Phương thức được thực hiện khi component có sự thay đổi
    //Cập nhật list hero
    ngOnChanges() {
        if (this.newHero != undefined) {
            this.heroes.splice(0, 0, this.newHero);
        }
    }

    //Phương thức thực hiện việc gửi request lấy danh sách hero theo phân đoạn và xử lý kết quả 
    public getHero(offset: number, limit: number) {
        this.loading = true;
        this.heroService.getHeroes(offset, limit)
            .subscribe(
                result => this.handlerGetHeroSuccessfully(result),
                error => this.handlerGetHeroFailure()
            );
    }

    //Phương thức được thực hiện khi search-bar được thay đổi giá trị 
    //Lấy danh sách hero theo từ khóa 
    public onSearch(term: string) {
        this.loading = true;
        this.heroService.searchHeroes(term)
            .debounceTime(300)
            .distinctUntilChanged()
            .subscribe(result => {
                    this.handlerGetHeroSuccessfully(result);
                },
                error => {
                    this.handlerGetHeroFailure()
                });
    }

    //Phương thức được thực hiện khi component pagination có sự thay đổi giá trị 
    //Lấy danh sách hero theo phân đoạn 
    public onPageChange(offset) {
        this.paginationConfig.offset = offset;
        this.getHero(this.paginationConfig.offset, this.paginationConfig.limit);
    }

    //Phương thức được thực hiện khi hero được xóa khỏi hero-item.component
    //Xóa Hero khỏi list hero
    public onDeleteHeroSuccessfully(hero) {
        let index = this.heroes.indexOf(hero);
        this.heroes.splice(index, 1);
    }

    //Phương thức được thực hiện khi hero được cập nhật từ hero-item.component
    //Cập nhật lại hero trong list hero
    public onNeedUpdateHero(hero) {
        let index = this.heroes.findIndex(x => x._id == hero._id);
        this.heroes[index] = hero;
    }

    //Phương thức xu ly khi nhan duoc danh sach hero tu server
    private handlerGetHeroSuccessfully(result) {
        this.paginationConfig.count = result.data.count;
        this.loading = false;

        this.heroes = result.data.heroes;
    }

    //Phương thức xu ly khi xay ra loi tu server
    private handlerGetHeroFailure() {
        this.toast.error('', 'Cannot get Heroes !');
    }
}
