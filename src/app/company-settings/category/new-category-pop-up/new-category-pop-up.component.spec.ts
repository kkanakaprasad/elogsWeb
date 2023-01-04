import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCategoryPopUpComponent } from './new-category-pop-up.component';

describe('NewCategoryPopUpComponent', () => {
  let component: NewCategoryPopUpComponent;
  let fixture: ComponentFixture<NewCategoryPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCategoryPopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCategoryPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
