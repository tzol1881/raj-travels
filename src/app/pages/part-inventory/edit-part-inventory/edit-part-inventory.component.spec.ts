import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPartInventoryComponent } from './edit-part-inventory.component';

describe('EditPartInventoryComponent', () => {
  let component: EditPartInventoryComponent;
  let fixture: ComponentFixture<EditPartInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPartInventoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPartInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
