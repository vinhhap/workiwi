import { Subscription } from 'rxjs/Rx';
import { AuthService } from './shared/services/auth.service';
import { SeoService } from './shared/services/seo.service';
import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
declare var ga: any;
declare var Smooch: any;

@Component({
  selector: 'jb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements AfterViewInit, OnDestroy {
  private sub: Subscription;

  constructor(private seoService: SeoService, public router: Router, private authService: AuthService) {
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

  ngAfterViewInit() {
    this.sub = this.authService.isLoggedIn().subscribe(auth => {
      if(!auth) {
        Smooch.init({
          appToken: '0uxoo8p9971ebygmx2dezwi5p',
          customText: {
            headerText: 'Tôi có thể giúp gì được bạn?',
            inputPlaceholder: 'Xin vui lòng nhập yêu cầu tại đây...',
            sendButtonText: 'Gửi',
            introductionText: 'Bạn có thể gửi yêu cầu đăng việc tại đây hoặc đóng góp ý tưởng để cải tiến trang web tại đây!',
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
