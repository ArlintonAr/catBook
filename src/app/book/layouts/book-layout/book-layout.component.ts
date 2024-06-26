import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import SearchComponent from '../../components/search/search.component';
import FiltersComponent from '../../components/filters/filters.component';
import { MenuBooksComponent } from '../../components/menu-books/menu-books.component';
import { ServiceBook } from '../../services/service-book.service';
import { AuthService } from '../../../auth/services/auth-service.service';


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


  constructor(
    private serviceBook: ServiceBook,
    private authSerive:AuthService
  ) {

  }

  getValorInput(item: string) {
    this.serviceBook.setCurrentBook(item);
  }


  onLogout(){
    this.authSerive.logout()
  }
}
