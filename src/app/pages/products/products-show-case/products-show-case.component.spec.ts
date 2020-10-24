import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsShowCaseComponent } from './products-show-case.component';

describe('ProductsShowCaseComponent', () => {
  let component: ProductsShowCaseComponent;
  let fixture: ComponentFixture<ProductsShowCaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsShowCaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsShowCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
