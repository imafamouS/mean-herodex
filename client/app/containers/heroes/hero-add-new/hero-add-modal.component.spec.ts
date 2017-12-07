import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroAddModalComponent } from './hero-add-modal.component';

describe('HeroAddModalComponent', () => {
    let component: HeroAddModalComponent;
    let fixture: ComponentFixture<HeroAddModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HeroAddModalComponent]
        })
               .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeroAddModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component)
        .toBeTruthy();
    });
});
