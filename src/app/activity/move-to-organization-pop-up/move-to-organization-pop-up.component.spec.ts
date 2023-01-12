import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveToOrganizationPopUpComponent } from './move-to-organization-pop-up.component';

describe('MoveToOrganizationPopUpComponent', () => {
  let component: MoveToOrganizationPopUpComponent;
  let fixture: ComponentFixture<MoveToOrganizationPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoveToOrganizationPopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoveToOrganizationPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
