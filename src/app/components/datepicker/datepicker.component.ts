import { Component, Output, EventEmitter, Input, OnInit, OnChanges} from '@angular/core';
import { FormGroup, FormGroupDirective, ControlContainer} from '@angular/forms';

import { TimepopoverComponent } from './timepopover/timepopover.component';

import { PopoverController } from '@ionic/angular';

import { FormService } from './form.service';

import { parse, format } from 'date-fns';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
})

export class DatepickerComponent implements OnInit, OnChanges {

    pickerOpen = false;
    datetime = '';
    formattedDate = '';

    timestamp: Date;
    date: any;
    time: any;

    startdatetime: any;
    enddatetime: any;

    placeholder: string;

    from: any;
    to: any;
    pageoutput = '';

    timeincluded: boolean;

    @Input() label: string;
    @Input() form: FormGroup;
    @Input() control: string;
    @Input() value: any;

    sourceNewEvent: boolean = true;
    @Input() sourceCalendar: boolean;

    @Input() includeTime: boolean;

    @Input() datetimeFrom: boolean;
    @Input() datetimeTo: boolean;

    @Input() min: Date;
    @Input() max: Date;

    constructor(public popoverCtrl: PopoverController,
                public forms: FormService) { }

                ngOnInit() {

                  if (this.sourceNewEvent) {
                    this.from = 'DD/MM/YYYY HH:mm';
                    this.forms.newStartDate.next(this.from);
                    this.to = '';
                    this.forms.newEndDate.next(this.to);
                    this.placeholder = 'DD/MM/YYYY HH:mm';
                    }

                    else {
                    // this.from = this.data.calSessionAddObj.data.StartTime;
                    // this.to = this.data.calSessionAddObj.data.EndTime;
                    this.placeholder = 'DD/MM/YYYY HH:mm';


                    if (this.control === 'eventStartDate') {
                      const formattedresult = format(new Date(this.from), 'DD/MM/YYYY HH:mm');
                      this.time = format(new Date(this.from), 'HH:mm');
                      // Change this to first event day
                      this.max = this.from;
                      this.forms.newStartDate.next(this.from);
                      this.form.controls[this.control].setValue(this.from);
                      this.form.updateValueAndValidity();
                      this.pageoutput = formattedresult;
                      this.date = this.from;
                    } else {
                      const formattedresult = format(new Date(this.to), 'DD/MM/YYYY HH:mm');
                      this.time = format(new Date(this.to), 'HH:mm');
                      // Change this to last event day
                      this.min = this.to;
                      this.forms.newEndDate.next(this.to);
                      this.form.controls[this.control].setValue(this.to);
                      this.form.updateValueAndValidity();
                      this.pageoutput = formattedresult;
                      this.date = this.to;

                    }

                  }

                    }

                    ngOnChanges() {

                      if (this.sourceNewEvent) {
                        this.from = '';
                        this.forms.newStartDate.next(this.from);
                        this.to = '';
                        this.forms.newEndDate.next(this.to);
                        } else {

                      if (this.includeTime) {
                        this.pageoutput = format(new Date(this.date), 'DD/MM/YYYY HH:mm');
                      } else {
                        this.pageoutput = format(new Date(this.date), 'DD/MM/YYYY');
                      }

                    }
                    }

                dateEntered(date, source) {

                    // DEFINES this.date
                    // If date comes from the picker and uses time use date.value else use this.date
                    if ((source === 'picker') && this.includeTime) {
                      this.date = parse(format(date.value, 'ddd DD MMM YYYY' ) + ' ' + this.time); }
                      else if (source === 'timepicker' && this.includeTime) {
                      this.date = parse(format(this.date, 'ddd DD MMM YYYY' ) + ' ' + this.time);
                    } else if (source === 'picker' && !this.includeTime) { this.date = date.value; this.time = '00:00'; }

                    // Write logic below in to if statements above

                    if (this.time === '') {
                      if (this.includeTime) { this.pageoutput = format(new Date(this.date), 'DD/MM/YYYY HH:mm'); } else {
                        this.pageoutput = format(new Date(this.date), 'DD/MM/YYYY');
                      }
                    } else {
                      const datetime = format(this.date, 'ddd DD MMM YYYY') + ' ' + this.time;
                      this.timestamp = parse(datetime);

                      if (this.includeTime) { this.pageoutput = format(new Date(this.timestamp), 'DD/MM/YYYY HH:mm'); } else {
                        this.pageoutput = format(new Date(this.timestamp), 'DD/MM/YYYY');
                      }
                    }

                    // Writes form values

                    if (this.control === 'eventStartDate') {
                      this.forms.newStartDate.next(this.date);
                      this.form.controls[this.control].setValue(this.date);
                    }

                    if (this.control === 'eventEndDate') {
                      this.forms.newEndDate.next(this.date);
                      this.form.controls[this.control].setValue(this.date);
                    }

                  }

                focus() {
                    this.pickerOpen = !this.pickerOpen;

                    if (this.control === 'eventStartDate') {
                      this.forms.newEndDate.subscribe(newdate => {
                      this.max = newdate;
                        });

                    }

                    if (this.control === 'eventEndDate') {
                      this.forms.newStartDate.subscribe(newdate => {
                      this.min = newdate;
                        });
                    }
                  }

                async timesPopover(ev: any) {
                    const popover = await this.popoverCtrl.create({
                      component:  TimepopoverComponent,
                      event: ev,
                      translucent: true,
                    });


                    popover.onDidDismiss()
                    .then(data => { if (data.data === undefined) {} else {
                      this.time = data.data;
                      console.log(this.date);
                      this.dateEntered(this.date, 'timepicker');
                    }

                });

                    return await popover.present();

                }


                }
