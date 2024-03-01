import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }


  // behaviour subject for adding data bto table from create account

  behaviourTableData=new BehaviorSubject([])

}
