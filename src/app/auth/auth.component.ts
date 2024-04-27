import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutAuthComponent } from './layouts/layout-auth/layout-auth.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    LayoutAuthComponent,
  ],
  templateUrl: './auth.component.html',

})
export default class AuthComponent {

}
