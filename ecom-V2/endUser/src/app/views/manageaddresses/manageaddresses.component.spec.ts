import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageaddressesComponent } from './manageaddresses.component';

describe('ManageaddressesComponent', () => {
  let component: ManageaddressesComponent;
  let fixture: ComponentFixture<ManageaddressesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageaddressesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageaddressesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
