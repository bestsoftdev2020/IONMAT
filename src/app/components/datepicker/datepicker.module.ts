import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { MatNativeDateModule, MatDatepickerModule, MatAutocompleteModule } from '@angular/material';

import { TimepopoverComponent } from './timepopover/timepopover.component';
import { DatepickerComponent } from './datepicker.component';

import { DatetimemaskDirective } from './directives/datetimemask.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    IonicModule,
    RouterModule.forChild([])
  ],
  providers: [],
  declarations: [DatepickerComponent, TimepopoverComponent, DatetimemaskDirective],
  entryComponents: [DatepickerComponent, TimepopoverComponent],
  exports: [DatepickerComponent, TimepopoverComponent, DatetimemaskDirective],
})
export class DatepickerComponentModule {}
