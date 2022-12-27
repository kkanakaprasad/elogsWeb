import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserPopUpComponent } from './add-user-pop-up.component';

describe('AddUserPopUpComponent', () => {
  let component: AddUserPopUpComponent;
  let fixture: ComponentFixture<AddUserPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUserPopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUserPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
