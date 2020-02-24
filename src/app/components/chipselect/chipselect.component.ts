import { Component, ViewChild, Input, EventEmitter, Output, OnInit, ElementRef } from '@angular/core';
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

  @ViewChild('trackAutoCompleteInput', { read: MatAutocompleteTrigger, static: true })

  @ViewChild(ChipautocompleteComponent, {static: true}) child;
  
  
  trackAutoCompleteInput: MatAutocompleteTrigger;

  showTracksSection: any;

  public firstSelection = false;
  public hasOptions = false;
  public showChild = false;
  public removeAvailable = true;
  public selectedOptions = [];
  public maxNumber: any;
  public currentItem: any;

  public focus: boolean;

  constructor(public chipservice: ChipserviceService) {
    this.maxNumber = 3;
  }

  ngOnInit() {
    this.chipservice.newSelectedOptions.next(this.selectedOptions);
    this.chipservice.newSelectedOptions.subscribe(selectedoptions => {
      this.selectedOptions = selectedoptions;
      console.log('selectedOptions', this.selectedOptions);
      console.log(this.hasOptions); 
       
      if(this.firstSelection){
        this.focus = true;
        console.log('The OpenPanel Check!', this.child.hasOpen());
        if(this.child.hasOpen()){
          this.focus = true;
        }else{
          this.focus = false;
        }
      }else{
        if(this.selectedOptions.length > 0){
          this.focus = true;
        }else{
          this.focus = false;
        }
      }
      
    });
    
  }

  ionViewWillLeave() {
    this.showChild = false;
    this.focus = false;
  }
  selectPrediction(prediction:any) {
   this.selectedOption.emit(prediction);
  }

  addTrack(i:any) {
    this.addTrackClicked.emit();
    this.trackSelected.emit(i);
  }

  emitAddTrack() {
   this.addTrackClicked.emit();
  }

  searchOptions(ev:any) {
    
    ev.stopPropagation(); 
    this.triggerAutocomplete();
  }

  triggerAutocomplete() {
    this.firstSelection = true;
    this.child.open();
    this.focus = true;
  }

  optionSelected(ev: any) {

    if(this.maxNumber === 1){
      if(this.selectedOptions.length > 0){
        console.log('current item', this.selectedOptions[0]);
        this.currentItem = this.selectedOptions[0];
      }
      this.selectedOptions.pop();
      this.removeAvailable = true;
      this.selectedOptions.push(ev);
      this.hasOptions = true;
      this.chipservice.newSelectedOptions.next(this.selectedOptions);

    }else if(this.selectedOptions.length === this.maxNumber){
      this.removeAvailable = false;
      return;
    }else{
      this.removeAvailable = true;
      this.selectedOptions.push(ev);
      this.hasOptions = true;
      this.chipservice.newSelectedOptions.next(this.selectedOptions);
      
    }

  }

  optionRemoved(i:any,item:any) {
    this.options.push(item); 
    this.selectedOptions.splice(i, 1);
    if(this.selectedOptions.length === 0){
      // this.hasOptions = false;
       this.focus = true;
       return;     
    }
    this.chipservice.newSelectedOptions.next(this.selectedOptions);
    
    
  }
  addOptionClicked(){
    this.addTrackClicked.emit(); 
    this.toggleFocus();
  }
  removeSelection(ev:any){
    
    if(!this.removeAvailable){
      return;
    }
    // remove object
    let removeIndex = this.options.map(function(item:any) { return item.id; }).indexOf(ev.id);
    if(this.maxNumber == 1){
      this.options.splice(removeIndex, 1);
      if(this.currentItem){
        this.options.push(this.currentItem);
        this.currentItem  = null;
      }

    } else {
      this.options.splice(removeIndex, 1);
    }  
    this.toggleFocus();  
  }
  toggleFocus() {
    console.log('Focus Status', this.focus);
    this.focus = !this.focus;
    
  }
}
