import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { MatNativeDateModule, MatDatepickerModule, MatAutocompleteModule } from '@angular/material';

import { ChipautocompleteModule } from './autocomplete/chipautocomplete.module';

import { ChipselectComponent } from './chipselect.component';

import { ChipserviceService } from './chipservice.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ChipautocompleteModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    IonicModule,
    RouterModule.forChild([])
  ],
  providers: [ChipserviceService],
  declarations: [ChipselectComponent],
  entryComponents: [ChipselectComponent],
  exports: [ChipselectComponent],
})
export class ChipselectComponentModule {}
