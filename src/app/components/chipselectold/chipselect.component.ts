import { Component, ViewChild, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { MatAutocompleteTrigger } from '@angular/material';

import { ChipautocompleteComponent } from './autocomplete/chipautocomplete.component';

import { ChipserviceService } from './chipservice.service';

@Component({
  selector: 'app-chipselect',
  templateUrl: './chipselect.component.html',
  styleUrls: ['./chipselect.component.scss'],
})
export class ChipselectComponent implements OnInit {

  @Input() options: Array<string>;

  @Output() selectedOption = new EventEmitter<any>();

  @Output() trackSelected = new EventEmitter<any>();

  @Output() addTrackClicked = new EventEmitter<any>();

  @ViewChild('trackAutoCompleteInput', { read: MatAutocompleteTrigger, static: false })

  @ViewChild(ChipautocompleteComponent, {static: false}) child;

  trackAutoCompleteInput: MatAutocompleteTrigger;

  showTracksSection: any;

  public hasOptions = false;
  public selectedOptions = [];

  constructor(public chipservice: ChipserviceService) {}

  ngOnInit() {
    this.chipservice.newSelectedOptions.next(this.selectedOptions);
    this.chipservice.newSelectedOptions.subscribe(selectedoptions => {
      this.selectedOptions = selectedoptions;
    });
  }

  selectPrediction(prediction) {
   // this.selectedOption.emit(prediction);
  }

  open() {
    this.trackAutoCompleteInput.openPanel();
  }

  addTrack(i) {
  //  this.trackSelected.emit(i);
  }

  emitAddTrack() {
  //  this.addTrackClicked.emit();
  }

  searchOptions(ev) {
    ev.stopPropagation();
    this.triggerAutocomplete();
  }

  triggerAutocomplete() {
    this.child.open();
  }

  optionSelected(ev) {
    this.selectedOptions.push(ev);
    this.hasOptions = true;
    this.chipservice.newSelectedOptions.next(this.selectedOptions);
  }

  optionRemoved(i) {
    this.selectedOptions.splice(i, 1);
    this.hasOptions = false;
    this.chipservice.newSelectedOptions.next(this.selectedOptions);
  }

}
