import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTaxTypeComponent } from './delete-tax-type.component';

describe('DeleteTaxTypeComponent', () => {
  let component: DeleteTaxTypeComponent;
  let fixture: ComponentFixture<DeleteTaxTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteTaxTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTaxTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
