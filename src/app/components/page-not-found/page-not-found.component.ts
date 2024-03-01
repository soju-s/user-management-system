import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.css'
})
export class PageNotFoundComponent {


  constructor(private location :Location){}

  returnBtnClicked(){

    this.location.back()

  }

}
