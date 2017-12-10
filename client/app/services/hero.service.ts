import { Injectable } from '@angular/core'
import { API } from '../app.config';
import { HeaderBuilder } from '../commons/header-request-builder';
import { DataService } from './data.service';

import { HeroModel } from '../models/index';

@Injectable()
export class HeroService {

    private headerBuilder: HeaderBuilder = new HeaderBuilder();

    constructor(private dataService: DataService) {

    }
    //Phương thức lấy danh sách hero từ từ khóa 
    public searchHeroes(term: string) {
        let options = this.headerBuilder.getHeaderWithToken();
        return this.dataService.get(API.hero_url + '/search?name=' + term, options);
    }

    //Phương thức lấy danh sách hero theo phân đoạn 
    public getHeroes(offset?: number, limit?: number) {
        let options = this.headerBuilder.getHeaderWithToken();
        let url: string;
        if (offset >= 0 && limit >= 0) {
            url = `${API.hero_url}?offset=${offset}&limit=${limit}`;
        } else {
            url = API.hero_url;
        }
        return this.dataService.get(url, options);
    }

    //Phương thức lấy thông tin hero 
    public getDetailHero(hero) {
        let options = this.headerBuilder.getHeaderWithToken();
        let id = hero || hero._id;

        return this.dataService.get(API.hero_url + '/' + id, options);
    }

    //Phương thức tạo mới hero 
    public create(hero: HeroModel) {
        let options = this.headerBuilder.getHeaderWithToken();

        return this.dataService.create(API.hero_url, JSON.stringify(hero), options);
    }

    //Phương thức cập nhật hero 
    public update(hero: HeroModel) {
        let options = this.headerBuilder.getHeaderWithToken();

        return this.dataService.update(API.hero_url + '/' + hero._id, JSON.stringify(hero), options);
    }
    
    //Phương thức xóa hero 
    public delete(hero: HeroModel) {
        let options = this.headerBuilder.getHeaderWithToken();
        let id = hero._id;
        return this.dataService.delele(API.hero_url, id, options);
    }

}
