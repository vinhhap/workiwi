import { Injectable } from '@angular/core';
import { Job } from "../model/job";

@Injectable()
export class JobListCacheService {

  jobsCached: Job[] = [];
  jobKeyCached: string = '';

  constructor() {}

  saveToJobCached(jobs: Job[]) {
    this.jobsCached = jobs;
  }

  saveToJobKeyCached(key: string) {
    this.jobKeyCached = key;
  }

  clearCache() {
    this.jobsCached = [];
    this.jobKeyCached = '';
  }
}
