import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DifficultWordsComponent } from './difficult-words.component';

describe('DifficultWordsComponent', () => {
  let component: DifficultWordsComponent;
  let fixture: ComponentFixture<DifficultWordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DifficultWordsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DifficultWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
