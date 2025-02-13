import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodPageDetailComponent } from './food-page-detail.component';

describe('FoodPageDetailComponent', () => {
  let component: FoodPageDetailComponent;
  let fixture: ComponentFixture<FoodPageDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodPageDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodPageDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
