import { Component, Input } from '@angular/core';
import { ISidebar } from 'src/app/data/interfaces/ISidebar.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  @Input() items!: ISidebar[];
  public user:any = {}

  constructor(
  ){ }

  ngOnInit(): void {
    // this.auth.currentUser.subscribe({
    //   next: (user) => this.user = user ?? {}
    // })
  }

  public hasRole(optionRole: string[]){
    return optionRole.includes(this.user.role);
  }

}
