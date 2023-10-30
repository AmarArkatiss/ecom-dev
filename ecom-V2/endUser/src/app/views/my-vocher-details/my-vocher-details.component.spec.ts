import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyVocherDetailsComponent } from './my-vocher-details.component';

describe('MyVocherDetailsComponent', () => {
  let component: MyVocherDetailsComponent;
  let fixture: ComponentFixture<MyVocherDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyVocherDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyVocherDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
