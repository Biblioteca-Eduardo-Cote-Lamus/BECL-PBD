import { NgModule } from '@angular/core'
import { MessagesModule } from 'primeng/messages';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { PasswordModule } from 'primeng/password'
@NgModule({
  declarations: [],
  exports: [
    MessagesModule,
    CalendarModule,
    DropdownModule,
    PasswordModule
  ]
})
export class PrimeModule { }
