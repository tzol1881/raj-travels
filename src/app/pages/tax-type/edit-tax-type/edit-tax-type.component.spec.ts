import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTaxTypeComponent } from './edit-tax-type.component';

describe('EditTaxTypeComponent', () => {
  let component: EditTaxTypeComponent;
  let fixture: ComponentFixture<EditTaxTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTaxTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTaxTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
