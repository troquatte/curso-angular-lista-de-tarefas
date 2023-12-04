import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputListItemComponent } from './input-list-item.component';

describe('InputListItemComponent', () => {
  let component: InputListItemComponent;
  let fixture: ComponentFixture<InputListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputListItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
