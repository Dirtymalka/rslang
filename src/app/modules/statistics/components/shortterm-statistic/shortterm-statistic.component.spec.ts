import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShorttermStatisticComponent } from './shortterm-statistic.component';

describe('ShorttermStatisticComponent', () => {
  let component: ShorttermStatisticComponent;
  let fixture: ComponentFixture<ShorttermStatisticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShorttermStatisticComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShorttermStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
