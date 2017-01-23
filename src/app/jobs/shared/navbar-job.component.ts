import { Component } from '@angular/core';
import { JobListCacheService } from "../../shared/services/job-list-cache.service";
import { Router } from "@angular/router"

@Component({
  selector: 'jb-navbar-job',
  templateUrl: './navbar-job.component.html',
  styleUrls: ['./navbar-job.component.less']
})
export class NavbarJobComponent {

  constructor(private jobListCacheService: JobListCacheService, private route: Router) { }

  clearCache() {
    this.jobListCacheService.clearCache();
  }

  goToRoute(param1, param2 = null) {
    this.clearCache();
    if(param2) {
      this.route.navigate(param1, param2);
    } else {
      this.route.navigate(param1);
    }
  }
}
