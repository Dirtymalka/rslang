import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DicSpinnerComponent } from './dic-spinner.component';

describe('DicSpinnerComponent', () => {
  let component: DicSpinnerComponent;
  let fixture: ComponentFixture<DicSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DicSpinnerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DicSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
