import { Component, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';

// Components
import { InputAddItemComponent } from '../../components/input-add-item/input-add-item.component';
import { InputListItemComponent } from '../../components/input-list-item/input-list-item.component';

// Interface
import { NgClass } from '@angular/common';
import Swal from 'sweetalert2';
import { ELocalStorage } from '../../../enum/ELocalStorage.enum';
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
      ELocalStorage.MY_LIST,
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

  public updateItemCheckbox(newItem: { checked: boolean; id: string }) {
    this.#setListItems.update((oldValue: IListItems[]) => {
      oldValue.map((res) => {
        if (res.id === newItem.id) {
          res.checked = newItem.checked;
          return res;
        }

        return res;
      });
      return oldValue;
    });

    return localStorage.setItem(
      ELocalStorage.MY_LIST,
      JSON.stringify(this.#setListItems())
    );
  }

  public updateItemText(newItem: { value: string; id: string }) {
    this.#setListItems.update((oldValue: IListItems[]) => {
      oldValue.map((res) => {
        if (res.id === newItem.id) {
          res.value = newItem.value;
          return res;
        }
        return res;
      });
      return oldValue;
    });

    return localStorage.setItem(
      ELocalStorage.MY_LIST,
      JSON.stringify(this.#setListItems())
    );
  }

  public deleteItem(id: string) {
    Swal.fire({
      title: 'Tem certeza',
      text: 'Você não poderá reverter isso!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, delete o item',
    }).then((result) => {
      if (result.isConfirmed) {
        this.#setListItems.update((oldValue: IListItems[]) => {
          return oldValue.filter((item) => item.id !== id);
        });

        return localStorage.setItem(
          ELocalStorage.MY_LIST,
          JSON.stringify(this.#setListItems())
        );
      }
    });
  }

  public deleteAllItems() {
    Swal.fire({
      title: 'Tem certeza',
      text: 'Você não poderá reverter isso!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, delete tudo',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem(ELocalStorage.MY_LIST);
        return this.#setListItems.set(this.#parseItem());
      }
    });
  }

  #parseItem() {
    return JSON.parse(localStorage.getItem(ELocalStorage.MY_LIST) || '[]');
  }
}
