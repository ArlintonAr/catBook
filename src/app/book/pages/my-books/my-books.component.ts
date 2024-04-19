import { Component} from '@angular/core';
import { CardBookComponent } from '../../components/card-book/card-book.component';
import { Item } from '../../interfaces/response-books-volumen';

@Component({
  selector: 'app-my-books',
  standalone: true,
  imports: [

    CardBookComponent
  ],
  templateUrl: './my-books.component.html',
  styleUrl: './my-books.component.css'
})
export default class MyBooksComponent {


  public myBooks: Item[]  =[]


  constructor(){
    this.getBooksOfLibrary()
  }


  getBooksOfLibrary(){
    this.myBooks=JSON.parse(localStorage.getItem('myBooks')!)
    console.log(this.myBooks)
  }

}
