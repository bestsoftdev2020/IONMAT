import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  public startdate: Date;
  public enddate: Date;

  public newStartDate: BehaviorSubject<Date> = new BehaviorSubject<Date>(this.startdate);
  public newEndDate: BehaviorSubject<Date> = new BehaviorSubject<Date>(this.enddate);

  constructor() { }
}
