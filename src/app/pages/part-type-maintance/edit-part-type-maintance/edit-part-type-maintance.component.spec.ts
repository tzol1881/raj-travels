import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPartTypeMaintanceComponent } from './edit-part-type-maintance.component';

describe('EditPartTypeMaintanceComponent', () => {
  let component: EditPartTypeMaintanceComponent;
  let fixture: ComponentFixture<EditPartTypeMaintanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPartTypeMaintanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPartTypeMaintanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
