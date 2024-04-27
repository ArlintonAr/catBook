import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service.service';
import { AuthStatus } from '../interfaces/auth-status.enum';



//Nombres ideales para los guard
  //PublicGuard - privateGuard (Tienen mas sentido semantico)

export const publicGuard: CanActivateFn = (route, state) => {

  const authService=inject(AuthService)
  const router=inject(Router)

  if(authService.authStatus()===AuthStatus.authenticated){
    router.navigateByUrl('/books/list-books')
    return false
  }

  return true;
};
