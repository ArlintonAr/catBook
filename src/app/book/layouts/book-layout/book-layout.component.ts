import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import SearchComponent from '../../components/search/search.component';
import FiltersComponent from '../../components/filters/filters.component';
import { MenuBooksComponent } from '../../components/menu-books/menu-books.component';
import { ServiceBook } from '../../services/service-book.service';
import { Item } from '../../interfaces/response-books-volumen';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';


@Component({
  selector: 'book-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,

    SearchComponent,
    FiltersComponent,
    MenuBooksComponent,
  ],
  templateUrl: './book-layout.component.html',
  styleUrl: './book-layout.component.css'
})
export default class BookLayoutComponent {

  public books: Item[] = []
  public valueInput: string = ''

  constructor(private serviceBook: ServiceBook) {}

  getValorInput(item: string) {
    this.valueInput = item;
    console.log(this.valueInput);

    // aquí seteas el valor
    this.serviceBook.setCurrentBook(item);
  }


}
