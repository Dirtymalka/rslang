import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LongtermStatisticComponent } from './longterm-statistic.component';

describe('LongtermStatisticComponent', () => {
  let component: LongtermStatisticComponent;
  let fixture: ComponentFixture<LongtermStatisticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LongtermStatisticComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LongtermStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
