import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  @Output() close = new EventEmitter<boolean>();
  private flagClose: boolean;

  constructor(
    private auth: AuthService
  ) {

      const stateNavbar = JSON.parse(localStorage.getItem('navbar') ?? 'false')
      this.flagClose = stateNavbar;
   }

  public closeNav() {
    this.flagClose = !this.flagClose;
    this.close.emit(this.flagClose);
    localStorage.setItem('navbar', `${this.flagClose}`)
  }

  public logout(){
    this.auth.logout()
  }
}
