import { Component, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';

// Components
import { InputAddItemComponent } from '../../components/input-add-item/input-add-item.component';
import { InputListItemComponent } from '../../components/input-list-item/input-list-item.component';

// Interface
import { NgClass } from '@angular/common';
import { IListItems } from '../../interface/IListItems.interface';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [NgClass, InputAddItemComponent, InputListItemComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  public addItem = signal(true);

  #setListItems = signal<IListItems[]>(this.#parseItem());
  listItems = this.#setListItems.asReadonly();
  listItems$() {
    return toObservable(this.#setListItems).subscribe((res: any) => {
      this.#setListItems.set(res);
    });
  }

  public getInputAndAddItem(value: IListItems) {
    localStorage.setItem(
      '@my-list',
      JSON.stringify([...this.#setListItems(), value])
    );

    return this.#setListItems.set(this.#parseItem());
  }

  public listItemsStage(value: 'pending' | 'completed') {
    return this.listItems().filter((res: IListItems) => {
      if (value === 'pending') {
        return !res.checked;
      }
      if (value === 'completed') {
        return res.checked;
      }
      return res;
    });
  }

  public updateItemCheckbox(newItem: { checked: boolean; id: number }) {
    this.#setListItems.update((oldValue: IListItems[]) => {
      oldValue[newItem.id].checked = newItem.checked;
      return oldValue;
    });

    return localStorage.setItem(
      '@my-list',
      JSON.stringify(this.#setListItems())
    );
  }

  public updateItemText(newItem: { value: string; id: number }) {
    this.#setListItems.update((oldValue: IListItems[]) => {
      oldValue[newItem.id].value = newItem.value;
      return oldValue;
    });

    return localStorage.setItem(
      '@my-list',
      JSON.stringify(this.#setListItems())
    );
  }

  public deleteItem(id: number) {
    this.#setListItems().splice(id, 1);

    return localStorage.setItem(
      '@my-list',
      JSON.stringify(this.#setListItems())
    );
  }

  public deleteAllItems() {
    localStorage.removeItem('@my-list');
    return this.#setListItems.set(this.#parseItem());
  }

  #parseItem() {
    return JSON.parse(localStorage.getItem('@my-list') || '[]');
  }
}
