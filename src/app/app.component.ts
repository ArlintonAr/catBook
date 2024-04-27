import { Component, computed, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './auth/services/auth-service.service';
import { AuthStatus } from './auth/interfaces/auth-status.enum';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {


   private authSerive=inject(AuthService)
  private router=inject(Router)

  public finishedAuthCheck=computed<boolean>(()=>{
    if (this.authSerive.authStatus()===AuthStatus.checking) {
      return false
    }
    return true
  })


  public authStatusChangedEffect=effect(()=>{

    switch( this.authSerive.authStatus()){
      case AuthStatus.checking:
        return;
      case AuthStatus.authenticated:
        this.router.navigateByUrl('/books/list-books')
        return
      case AuthStatus.notAuthenticated:
        this.router.navigateByUrl('/auth/login')
        return
      }

  })

}
