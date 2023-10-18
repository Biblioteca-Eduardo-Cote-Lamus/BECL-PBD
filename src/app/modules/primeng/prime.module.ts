import { NgModule } from '@angular/core'
import { MessagesModule } from 'primeng/messages';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { PasswordModule } from 'primeng/password'
import { ChipsModule } from 'primeng/chips';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
@NgModule({
  declarations: [],
  exports: [
    MessagesModule,
    CalendarModule,
    DropdownModule,
    PasswordModule,
    ChipsModule,
    TooltipModule,
    TableModule,
    TagModule,
    DialogModule,
    InputSwitchModule,
    PanelModule,
    CardModule
  ]
})
export class PrimeModule { }
