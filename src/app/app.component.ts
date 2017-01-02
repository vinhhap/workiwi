import { SeoService } from './shared/services/seo.service';
import { Component } from '@angular/core';

@Component({
  selector: 'jb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  constructor(private seoService: SeoService) {
    seoService.setTitle('Workiwi | Trang tuyển dụng việc làm cho Start Up');
    seoService.setMetaDescription('Chuyên trang tuyển dụng việc làm dành cho các Start Up');
    seoService.setMetaRobots('Index, Follow');
  }
}
