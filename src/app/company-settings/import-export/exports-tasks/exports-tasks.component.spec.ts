import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportsTasksComponent } from './exports-tasks.component';

describe('ExportsTasksComponent', () => {
  let component: ExportsTasksComponent;
  let fixture: ComponentFixture<ExportsTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportsTasksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExportsTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
