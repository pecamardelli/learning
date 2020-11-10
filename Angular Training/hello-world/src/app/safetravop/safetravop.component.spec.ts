import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafetravopComponent } from './safetravop.component';

describe('SafetravopComponent', () => {
  let component: SafetravopComponent;
  let fixture: ComponentFixture<SafetravopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SafetravopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SafetravopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
