import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }


  // data from header to sidebar
  dataFromHeadertoSidebar:boolean=false

  // behaviour subject
  headerAndSidebarSubject = new BehaviorSubject(false)

}
