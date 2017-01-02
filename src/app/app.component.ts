import { Component } from '@angular/core';
import { MetaService } from 'ng2-meta';

@Component({
  selector: 'jb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  constructor(private metaService: MetaService) {}
}
