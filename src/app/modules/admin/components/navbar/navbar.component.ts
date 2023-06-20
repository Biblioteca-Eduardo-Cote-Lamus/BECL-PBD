import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  @Output() close = new EventEmitter<boolean>();
  private flagClose = false;

  constructor(
    private auth: AuthService
  ) { }

  public closeNav() {
    this.flagClose = !this.flagClose;
    this.close.emit(this.flagClose);
  }

  public logout(){
    this.auth.logout()
  }
}
