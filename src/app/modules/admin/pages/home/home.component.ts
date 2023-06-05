import { Component } from '@angular/core';
import { sidebarItems } from 'src/app/data/const/sidebarItems.const';
import { ISidebar } from 'src/app/data/interfaces/ISidebar.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  public items: ISidebar[] = sidebarItems;
  public open: boolean = false;

  public closeNav(event: boolean){
    this.open = event
  }
}
