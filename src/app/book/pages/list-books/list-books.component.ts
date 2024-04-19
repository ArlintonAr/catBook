import { Component, OnDestroy, OnInit, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';


import { LoaderComponent } from '../../components/loader/loader.component';
import { CardBookComponent } from '../../components/card-book/card-book.component';
import { ServiceBook } from '../../services/service-book.service';
import { Item } from '../../interfaces/response-books-volumen';

@Component({
  selector: 'app-list-books',
  standalone: true,
  imports: [
    CommonModule,
    LoaderComponent,
    CardBookComponent,


  ],
  templateUrl: './list-books.component.html',
  styleUrl: './list-books.component.css'
})
export default class ListBooksComponent implements OnInit,OnDestroy {

  public books:Item[]=[]

  private bookSubscription: Subscription | undefined; // sirve para hacer referencia a la subscripcion y luego poder eliminarla en OnDestroy
  private serviceBook=inject(ServiceBook)

  constructor(){

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
  ngOnDestroy(): void {
    this.bookSubscription?.unsubscribe(); // elimina la subscripcion
  }


  getBooks(item: string) {
    this.serviceBook.getBooksForVolumen(item)
    .subscribe((books) => {
      this.books =books.items
      console.log(this.books)
    });
  }


}
