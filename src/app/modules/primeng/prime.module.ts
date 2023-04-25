import { NgModule } from '@angular/core'
import { MessagesModule } from 'primeng/messages';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
@NgModule({
  declarations: [],
  exports: [
    MessagesModule,
    CalendarModule,
    DropdownModule
  ]
})
export class PrimeModule { }
