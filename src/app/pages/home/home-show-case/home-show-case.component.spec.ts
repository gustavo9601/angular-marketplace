import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeShowCaseComponent } from './home-show-case.component';

describe('HomeShowCaseComponent', () => {
  let component: HomeShowCaseComponent;
  let fixture: ComponentFixture<HomeShowCaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeShowCaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeShowCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
