import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'jb-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less']
})
export class AdminComponent {

  constructor(private elementRef: ElementRef) { }

}
