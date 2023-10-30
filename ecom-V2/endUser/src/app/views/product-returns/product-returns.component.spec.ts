import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductReturnsComponent } from './product-returns.component';

describe('ProductReturnsComponent', () => {
  let component: ProductReturnsComponent;
  let fixture: ComponentFixture<ProductReturnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductReturnsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductReturnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
