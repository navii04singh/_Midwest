import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailsTableComponent } from './order-details-table.component';

describe('OrderDetailsTableComponent', () => {
  let component: OrderDetailsTableComponent;
  let fixture: ComponentFixture<OrderDetailsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderDetailsTableComponent]
    });
    fixture = TestBed.createComponent(OrderDetailsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
