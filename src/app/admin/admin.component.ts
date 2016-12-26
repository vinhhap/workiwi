import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'jb-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less']
})
export class AdminComponent implements OnInit {

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
  }

}
