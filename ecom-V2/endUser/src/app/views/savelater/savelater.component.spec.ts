import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SavelaterComponent } from './savelater.component';

describe('SavelaterComponent', () => {
  let component: SavelaterComponent;
  let fixture: ComponentFixture<SavelaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavelaterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavelaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
