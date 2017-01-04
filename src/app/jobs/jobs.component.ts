import { Component, OnInit, AfterViewInit } from '@angular/core';

declare var Smooch: any;

@Component({
  selector: 'jb-jobs',
  templateUrl: './jobs.component.html'
})
export class JobsComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit() {
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

}
