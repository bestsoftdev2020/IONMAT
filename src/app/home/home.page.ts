import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';

import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  options: any;
  public allday: boolean;

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private data: DataService) {
    this.form = this.formBuilder.group({
      eventStartDate: [''],
      eventEndDate: [''],
      chip_option: ['']
      });
  }

  ngOnInit() {
    this.data.getData().subscribe(data => {
      this.options = data;
    });
    this.allday = false;
  }

  allDayToggle(ev) {
    this.allday = ev.detail.checked;
  }

  focus() {
    
  }

}
