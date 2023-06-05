import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  @Output() close = new EventEmitter<boolean>();
  private flagClose = false;

  public closeNav() {
    this.flagClose = !this.flagClose;
    this.close.emit(this.flagClose);
  }

  public logout(){

  }
}
