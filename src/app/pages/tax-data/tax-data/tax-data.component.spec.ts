import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxDataComponent } from './tax-data.component';

describe('TaxDataComponent', () => {
  let component: TaxDataComponent;
  let fixture: ComponentFixture<TaxDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
