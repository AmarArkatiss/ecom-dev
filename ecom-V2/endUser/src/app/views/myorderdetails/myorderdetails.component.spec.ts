import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyorderdetailsComponent } from './myorderdetails.component';

describe('MyorderdetailsComponent', () => {
  let component: MyorderdetailsComponent;
  let fixture: ComponentFixture<MyorderdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyorderdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyorderdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
