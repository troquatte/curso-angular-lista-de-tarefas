import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputAddItemComponent } from './input-add-item.component';

describe('InputAddItemComponent', () => {
  let component: InputAddItemComponent;
  let fixture: ComponentFixture<InputAddItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputAddItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputAddItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
