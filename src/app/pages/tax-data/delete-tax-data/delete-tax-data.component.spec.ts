import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTaxDataComponent } from './delete-tax-data.component';

describe('DeleteTaxDataComponent', () => {
  let component: DeleteTaxDataComponent;
  let fixture: ComponentFixture<DeleteTaxDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteTaxDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTaxDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
