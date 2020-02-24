import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { MatNativeDateModule, MatDatepickerModule, MatAutocompleteModule } from '@angular/material';

import { HomePage } from './home.page';

import { ChipselectComponentModule } from '../components/chipselect/chipselect.module';
import { DatepickerComponentModule } from '../components/datepicker/datepicker.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ChipselectComponentModule,
    DatepickerComponentModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    HttpClientModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
