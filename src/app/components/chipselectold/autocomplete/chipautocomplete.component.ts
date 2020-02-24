import { Component, ViewChild, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatAutocompleteTrigger } from '@angular/material';

@Component({
  selector: 'app-chipautocomplete',
  templateUrl: './chipautocomplete.component.html',
  styleUrls: ['./chipautocomplete.component.scss'],
})
export class ChipautocompleteComponent implements OnInit {

  @Input() options: Array<string>;

  @Output() selectedOption = new EventEmitter<any>();

  @Output() optionSelected = new EventEmitter<any>();

  @Output() addOptionClicked = new EventEmitter<any>();

  @ViewChild('optionAutoCompleteInput', { read: MatAutocompleteTrigger, static: false })

  optionAutoCompleteInput: MatAutocompleteTrigger;

  showTracksSection: any;

  ngOnInit() {}

  selectPrediction(prediction) {
    this.selectedOption.emit(prediction);
  }

  open() {
    this.optionAutoCompleteInput.openPanel();
  }

  addOption(i) {
  // This adds option to a dialogue box
    this.optionSelected.emit(i);
  }

  emitAddOption() {

    // This loads manage options page
    this.addOptionClicked.emit();
  }

}
