import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Data } from '../data';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DbService implements InMemoryDbService {

  createDb() {
    const data: Data[] = [
      { id: 1, name: 'Mumbai' },
      { id: 2, name: 'Tokyo' },
      { id: 3, name: 'Beijing'},
      { id: 4, name: 'Canberra'},
      { id: 5, name: 'Jakarta' }

    ];
    return {data};
  }
}
