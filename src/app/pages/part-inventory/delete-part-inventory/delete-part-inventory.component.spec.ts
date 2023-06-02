import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePartInventoryComponent } from './delete-part-inventory.component';

describe('DeletePartInventoryComponent', () => {
  let component: DeletePartInventoryComponent;
  let fixture: ComponentFixture<DeletePartInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletePartInventoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePartInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
