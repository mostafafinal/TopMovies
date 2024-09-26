import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForLaterPageComponent } from './forlater.component';

describe('ForLaterPageComponent', () => {
  let component: ForLaterPageComponent;
  let fixture: ComponentFixture<ForLaterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForLaterPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ForLaterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
