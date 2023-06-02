import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTaxDataComponent } from './edit-tax-data.component';

describe('EditTaxDataComponent', () => {
  let component: EditTaxDataComponent;
  let fixture: ComponentFixture<EditTaxDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTaxDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTaxDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
