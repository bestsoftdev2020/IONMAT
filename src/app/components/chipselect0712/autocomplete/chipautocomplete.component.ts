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
  @Output() removeSelection = new EventEmitter<any>();
  @Output() editOptionClicked = new EventEmitter<any>();

  @Output() addTrackClicked = new EventEmitter<any>();
  isOpen: boolean;
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
  close(){
    this.optionAutoCompleteInput.closePanel();
    console.log('asdfasdf');
  }

  addOption(i:any) {
  // This adds option to a dialogue box
    this.optionSelected.emit(i);
    // this.options.splice(i,1);
    this.removeSelection.emit(i);
     
  }

  emitAddOption() {
    console.log('Edit Chip Clicked!');
    // This loads manage options page
    this.addTrackClicked.emit();
  }

}
