import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVehicalComponent } from './edit-vehical.component';

describe('EditVehicalComponent', () => {
  let component: EditVehicalComponent;
  let fixture: ComponentFixture<EditVehicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditVehicalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVehicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
