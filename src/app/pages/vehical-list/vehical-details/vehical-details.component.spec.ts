import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicalDetailsComponent } from './vehical-details.component';

describe('VehicalDetailsComponent', () => {
  let component: VehicalDetailsComponent;
  let fixture: ComponentFixture<VehicalDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicalDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
