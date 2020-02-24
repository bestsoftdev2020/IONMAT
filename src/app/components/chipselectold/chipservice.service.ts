import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChipserviceService {

  public selectedOptions = [];
  public options = [];

  public newOptions: BehaviorSubject<any> = new BehaviorSubject<any>(this.options);
  public newSelectedOptions: BehaviorSubject<any> = new BehaviorSubject<any>(this.options);
}
