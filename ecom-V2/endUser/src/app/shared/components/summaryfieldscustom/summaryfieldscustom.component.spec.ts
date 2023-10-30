import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryfieldscustomComponent } from './summaryfieldscustom.component';

describe('SummaryfieldscustomComponent', () => {
  let component: SummaryfieldscustomComponent;
  let fixture: ComponentFixture<SummaryfieldscustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryfieldscustomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryfieldscustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
