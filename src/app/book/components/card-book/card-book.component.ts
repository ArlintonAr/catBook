
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LoaderComponent } from '../loader/loader.component';
import { RouterModule } from '@angular/router';
import { BookImagePipe } from '../../pipes/book-image.pipe';
import { ImageLinks } from '../../interfaces/response-books-volumen';

@Component({
  selector: 'app-card-book',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LoaderComponent,
    BookImagePipe
  ],
  templateUrl: './card-book.component.html',
  styleUrl: './card-book.component.css'
})
export class CardBookComponent {

  @Input() genderBook:string[]|undefined=[]
  @Input() imgBook!:ImageLinks
  @Input() title:string=''
  @Input() publishedDate:string |undefined=''
  @Input() authors:string[]| undefined=[]
  @Input() language:string=''
  @Input() id:string=''




}
