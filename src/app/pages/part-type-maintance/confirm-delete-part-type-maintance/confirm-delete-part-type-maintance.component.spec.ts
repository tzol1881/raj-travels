import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeletePartTypeMaintanceComponent } from './confirm-delete-part-type-maintance.component';

describe('ConfirmDeletePartTypeMaintanceComponent', () => {
  let component: ConfirmDeletePartTypeMaintanceComponent;
  let fixture: ComponentFixture<ConfirmDeletePartTypeMaintanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDeletePartTypeMaintanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDeletePartTypeMaintanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
