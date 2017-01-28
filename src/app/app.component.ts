import { Subscription } from 'rxjs/Rx';
import { SeoService } from './shared/services/seo.service';
import { Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
declare var ga: any;
declare var Smooch: any;

@Component({
  selector: 'jb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnDestroy {
  private sub: Subscription;

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

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
