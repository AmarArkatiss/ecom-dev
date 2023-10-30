import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VocherDetailsComponent } from './vocher-details.component';

describe('VocherDetailsComponent', () => {
  let component: VocherDetailsComponent;
  let fixture: ComponentFixture<VocherDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VocherDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VocherDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
