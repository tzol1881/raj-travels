import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPartTypeComponent } from './edit-part-type.component';

describe('EditPartTypeComponent', () => {
  let component: EditPartTypeComponent;
  let fixture: ComponentFixture<EditPartTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPartTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPartTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
