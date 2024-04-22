import { Pipe, PipeTransform } from '@angular/core';
import { ResponseBook } from '../interfaces/book.interface';
import { ImageLinks, Item } from '../interfaces/response-books-volumen';

@Pipe({
  name: 'bookImage',
  standalone: true
})
export class BookImagePipe implements PipeTransform {

  transform(imageBook:ImageLinks):string{
    if( imageBook===undefined) {
      return `assets/notImage.jpg`
    }
    return imageBook.smallThumbnail
  }

}
