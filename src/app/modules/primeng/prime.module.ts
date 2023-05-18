import { NgModule } from '@angular/core'
import { MessagesModule } from 'primeng/messages';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { PasswordModule } from 'primeng/password'
import { ChipsModule } from 'primeng/chips';
import { TooltipModule } from 'primeng/tooltip';
@NgModule({
  declarations: [],
  exports: [
    MessagesModule,
    CalendarModule,
    DropdownModule,
    PasswordModule,
    ChipsModule,
    TooltipModule
  ]
})
export class PrimeModule { }
