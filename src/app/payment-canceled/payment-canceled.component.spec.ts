import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentCanceledComponent } from './payment-canceled.component';

describe('PaymentCanceledComponent', () => {
  let component: PaymentCanceledComponent;
  let fixture: ComponentFixture<PaymentCanceledComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentCanceledComponent]
    });
    fixture = TestBed.createComponent(PaymentCanceledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
