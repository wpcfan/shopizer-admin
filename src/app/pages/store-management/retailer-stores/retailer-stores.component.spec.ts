import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RetailerStoresComponent } from './retailer-stores.component';

describe('RetailerStoresComponent', () => {
  let component: RetailerStoresComponent;
  let fixture: ComponentFixture<RetailerStoresComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailerStoresComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailerStoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
