import { Component, OnInit, inject} from '@angular/core';

import { LoaderComponent } from '../../components/loader/loader.component';
import { CardBookComponent } from '../../components/card-book/card-book.component';
import { Item} from '../../interfaces/response-books-volumen';
import { CommonModule } from '@angular/common';
import { ServiceBook } from '../../services/service-book.service';
import BookLayoutComponent from '../../layouts/book-layout/book-layout.component';
import SearchComponent from '../../components/search/search.component';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-list-books',
  standalone: true,
  imports: [
    CommonModule,
    LoaderComponent,
    CardBookComponent,

    SearchComponent
  ],
  templateUrl: './list-books.component.html',
  styleUrl: './list-books.component.css'
})
export default class ListBooksComponent {

  public books:Item[]=[]
  public itemValor:string='matematica'

  private bookSubscription: Subscription | undefined; // sirve para hacer referencia a la subscripcion y luego poder eliminarla en OnDestroy
  private serviceBook=inject(ServiceBook)

  constructor(){
    this.getBooks(this.itemValor)
  }


  ngOnInit(): void {
    // aquí lees el valor
    this.bookSubscription = this.serviceBook.currentBook.subscribe(
      (book: string) => {
        if (book.length > 4) {
          this.getBooks(book);
        }
      }
    );
  }

  getBooks(item: string) {
    this.serviceBook.getBooksForVolumen(item).subscribe((books) => {
      this.books = books.items;
      console.log(this.books);
    });
  }

  ngOnDestroy(): void {
    this.bookSubscription?.unsubscribe(); // elimina la subscripcion
  }

}
