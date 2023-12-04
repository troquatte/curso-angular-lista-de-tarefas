import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IListItems } from '../../interface/IListItems.interface';

@Component({
  selector: 'app-input-list-item',
  standalone: true,
  imports: [],
  templateUrl: './input-list-item.component.html',
  styleUrl: './input-list-item.component.scss',
})
export class InputListItemComponent {
  @Input({
    required: true,
  })
  public inputListItems: IListItems[] = [];

  @Output() public outputUpdateItemCheckbox = new EventEmitter<{
    checked: boolean;
    id: number;
  }>();
  public updateItemCheckbox(checked: boolean, id: number) {
    return this.outputUpdateItemCheckbox.emit({ checked, id });
  }

  @Output() public outputUpdateItemText = new EventEmitter<{
    value: string;
    id: number;
  }>();
  public updateItemText(value: string, id: number) {
    return this.outputUpdateItemText.emit({ value, id });
  }

  @Output() public outputDeleteItem = new EventEmitter<number>();
  public deleteItem(id: number) {
    return this.outputDeleteItem.emit(id);
  }
}
