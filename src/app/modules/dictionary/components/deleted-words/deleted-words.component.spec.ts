import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedWordsComponent } from './deleted-words.component';

describe('DeletedWordsComponent', () => {
  let component: DeletedWordsComponent;
  let fixture: ComponentFixture<DeletedWordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeletedWordsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletedWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
