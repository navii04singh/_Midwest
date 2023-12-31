import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicensePurchaseComponent } from './license-purchase.component';

describe('LicensePurchaseComponent', () => {
  let component: LicensePurchaseComponent;
  let fixture: ComponentFixture<LicensePurchaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LicensePurchaseComponent]
    });
    fixture = TestBed.createComponent(LicensePurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
