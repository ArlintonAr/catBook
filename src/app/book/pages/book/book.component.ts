import { Component, OnInit, inject } from '@angular/core';
import { Item, ResponseBooksVolumen } from '../../interfaces/response-books-volumen';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { ServiceBook } from '../../services/service-book.service';
import { ResponseBook } from '../../interfaces/book.interface';
import { LoaderSkeletonComponent } from '../../components/loader-skeleton/loader-skeleton.component';
import { DeleteBookComponent } from '../../components/delete-book/delete-book.component';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [

    LoaderSkeletonComponent,
    DeleteBookComponent
  ],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export default class BookComponent implements OnInit {

  public book?:ResponseBook | undefined


  private serviceBook=inject(ServiceBook)
  private activatedRoute=inject(ActivatedRoute)
  private router=inject(Router)



  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
          delay(2000),
          switchMap((({id})=>this.serviceBook.getBookForId(id)))
      )
      .subscribe(book=>{
        if(!book) return this.router.navigate(['/books/list-books'])
          this.book=book
          return
        })
  }

  addToLibrary(){
    if (this.book) {
      this.serviceBook.updateBookInLibrary(this.book)
    }
    this.router.navigate(['/books/my-books'])
  }


}


