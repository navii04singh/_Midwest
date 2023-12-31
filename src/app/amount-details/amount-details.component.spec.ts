import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmountDetailsComponent } from './amount-details.component';

describe('AmountDetailsComponent', () => {
  let component: AmountDetailsComponent;
  let fixture: ComponentFixture<AmountDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AmountDetailsComponent]
    });
    fixture = TestBed.createComponent(AmountDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
