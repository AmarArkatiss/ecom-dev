import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyorderreviewComponent } from './myorderreview.component';

describe('MyorderreviewComponent', () => {
  let component: MyorderreviewComponent;
  let fixture: ComponentFixture<MyorderreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyorderreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyorderreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
