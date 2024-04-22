import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { ResponseBook } from '../../interfaces/book.interface';
import { ServiceBook } from '../../services/service-book.service';

@Component({
  selector: 'app-delete-book',
  standalone: true,
  imports: [],
  templateUrl: './delete-book.component.html',
  styleUrl: './delete-book.component.css'
})
export class DeleteBookComponent implements OnInit {

  public isButtonActive: boolean = false;
  private activeRoute = inject(ActivatedRoute)
  private serviceBook = inject(ServiceBook)
  private route=inject(Router)

  ngOnInit(): void {

  }



  deleteBookOfLibrary(){
    this.activeRoute.params
    .pipe(
      map((({ id }) => this.serviceBook.isBookInLocalStorage(id)))
    )
    .subscribe(id=>{
      console.log(id)
      this.serviceBook.removeBookOfLocalStorage(id)
      this.route.navigate(['/books/my-books'])
    })
  }
}
