import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { BehaviorSubject, Observable, filter } from 'rxjs';

import { environment } from '../../environments/environments';

import { Item, ResponseBooksVolumen } from '../interfaces/response-books-volumen';
import { ResponseBook } from '../interfaces/book.interface';



@Injectable({
  providedIn: 'root'
})
export class ServiceBook {
  private currentBookSubject: BehaviorSubject<string> = new BehaviorSubject('');
  public readonly currentBook: Observable<string> = this.currentBookSubject.asObservable(); // currentBook es el valor que quieres leer


  private http = inject(HttpClient)
  private urlApi: string = environment.url

  constructor() {
  }

  // con esta fn seteas el valor que deseas
  setCurrentBook(book: string): void {
    this.currentBookSubject.next(book);
  }

  getBooksForVolumen(query: string=' '): Observable<ResponseBooksVolumen> {
    return this.http.get<ResponseBooksVolumen>(`${this.urlApi}?q=${query}&maxResults=40`)
    .pipe(
      filter(books=>books.items.length>0)
    )
  }

  getBookForId(id: string): Observable<ResponseBook> {
    return this.http.get<ResponseBook>(`${this.urlApi}/${id}`)
  }






  updateBookInLibrary(book: ResponseBook): void {
    let listBooks: ResponseBook[] = []
    if (localStorage.getItem('myBooks') === null) {
      this.insertBookListInLocalStorage(book, listBooks)
    } else {
      listBooks = JSON.parse(localStorage.getItem('myBooks')!)
      if (!listBooks.some(existBook => existBook.id === book.id)) {
        this.insertBookListInLocalStorage(book, listBooks)
      } else {
        console.log("Este libro ya está en tus favoritos")
      }
    }
  }


  insertBookListInLocalStorage(book: ResponseBook, listBooks: ResponseBook[]) {
    listBooks.push(book)
    localStorage.setItem('myBooks', JSON.stringify(listBooks))
  }

  isBookInLocalStorage(id: string): string {
    let listBooks: ResponseBook[] = []
    listBooks = JSON.parse(localStorage.getItem('myBooks')!)
    if (listBooks.find(book => book.id === id)) {
      return id
    }
    return 'No existe'
  }

  removeBookOfLocalStorage(id: string) {
    let listBooks: ResponseBook[]
    listBooks = JSON.parse(localStorage.getItem('myBooks')!)
    const index = listBooks.findIndex(book => book.id === id)
    if (index !== -1) {
      console.log(index)
      listBooks.splice(index, 1)
      localStorage.setItem('myBooks', JSON.stringify(listBooks))

    }

  }

}
