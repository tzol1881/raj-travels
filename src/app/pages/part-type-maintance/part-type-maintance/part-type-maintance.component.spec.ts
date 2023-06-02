import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartTypeMaintanceComponent } from './part-type-maintance.component';

describe('PartTypeMaintanceComponent', () => {
  let component: PartTypeMaintanceComponent;
  let fixture: ComponentFixture<PartTypeMaintanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartTypeMaintanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartTypeMaintanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
