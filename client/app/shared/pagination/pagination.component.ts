import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
    @Input('offset') offset: number = 0;
    @Input('limit') limit: number = 1;
    @Input('size') size: number = 1;
    @Input('range') range: number = 3;
    @Output('pageChange') pageChange: EventEmitter<number> = new EventEmitter<number>();

    pages: Observable<number[]>;
    currentPage: number;
    totalPages: number;

    constructor() {
    }

    ngOnInit() {
        this.getPages(this.offset, this.limit, this.size);
    }

    ngOnChanges() {
        this.getPages(this.offset, this.limit, this.size);
    }
    //Phương thức được thực hiện khi có việc chọn trang 
    public selectPage(page: number, event) {
        this.cancelEvent(event);
        if (this.isValidPageNumber(page, this.totalPages)) {
            this.pageChange.emit((page - 1) * this.limit);
        }
    }

    //Dừng sự kiện hiện tại 
    public cancelEvent(event) {
        event.preventDefault();
    }

    //Tạo danh sách các trang
    private getPages(offset: number, limit: number, size: number) {
        this.currentPage = this.getCurrentPage(offset, limit);
        this.totalPages = this.getTotalPages(limit, size);
        this.pages = Observable.range(-this.range, this.range * 2 + 1)
                               .map(offset => this.currentPage + offset)
                               .filter(page => this.isValidPageNumber(page, this.totalPages))
                               .toArray();
    }

    //Kiểm tra xem trang có hợp lệ 
    private isValidPageNumber(page: number, totalPages: number): boolean {
        return page > 0 && page <= totalPages;
    }

    //Lấy trang hiện tại 
    private getCurrentPage(offset: number, limit: number): number {
        return Math.floor(offset / limit) + 1;
    }
    
    //Lấy tổng số trang 
    private getTotalPages(limit: number, size: number): number {
        return Math.ceil(Math.max(size, 1) / Math.max(limit, 1));
    }

}
