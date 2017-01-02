import { SeoService } from './shared/services/seo.service';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
declare var ga: any;
@Component({
  selector: 'jb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  constructor(private seoService: SeoService, public router: Router) {
    seoService.setTitle('Workiwi | Trang tuyển dụng việc làm cho Start Up');
    seoService.setMetaDescription('Chuyên trang tuyển dụng việc làm dành cho các Start Up');
    seoService.setMetaRobots('Index, Follow');
    router.events.distinctUntilChanged((previous: any, current: any) => {
                if(current instanceof NavigationEnd) {
                    return previous.url === current.url;
                }
                return true;
            }).subscribe((x: any) => {
                ga('send', 'pageview', x.url);
            });
  }
}
