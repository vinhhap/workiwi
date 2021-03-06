import { Subject, Observable } from 'rxjs/Rx';
import { Injectable, Inject } from '@angular/core';
import { AngularFire, FirebaseRef } from "angularfire2";
import { Router } from "@angular/router";
import { Job } from "../model/job";

@Injectable()
export class JobService {
  sdkStorage: any;
  sdkDb: any;

  constructor(private af: AngularFire,
              @Inject(FirebaseRef) fb,
              private router: Router)
  {
    this.sdkStorage = fb.storage().ref();
    this.sdkDb = fb.database();
  }

  findJobs(query = {}): Observable<Job[]> {
    return this.af.database.list("jobs", query).map(Job.fromJsonList);
  }

  findAllJob(): Observable<Job[]> {
    return this.findJobs();
  }

  findJobByType(type: string): Observable<Job[]> {
    return this.findJobs({
      query: {
        orderByChild: "jobType",
        equalTo: type
      }
    });
  }

  loadFirstJobsPage(pageSize: number): Observable<Job[]> {
    return this.findJobs({
      query: {
        limitToLast: pageSize
      }
    });
  }

  loadNextJobsPage(jobKey: string, pageSize: number): Observable<Job[]> {
    return this.findJobs({
      query: {
        orderByKey: true,
        endAt: jobKey,
        limitToLast: pageSize + 1
      }
    });
  }

  loadFirstJobsTypePage(pageSize: number, type: string): Observable<Job[]> {
    return this.findJobs({
      query: {
        orderByChild: "jobType",
        equalTo: type,
        limitToLast: pageSize
      }
    });
  }

  loadNextJobsTypePage(jobKey: string, pageSize: number, type: string) {           
    return this.af.database.list(`types/${type}`, {
      query: {
        orderByKey: true,
        endAt: jobKey,
        limitToLast: pageSize + 1
      }
    })
    .map(jpt => jpt.map(job => this.af.database.object(`jobs/${job.$key}`)))
    .flatMap(fbojs => Observable.combineLatest(fbojs));
  }

  loadFirstJobsCityPage(pageSize: number, city: string): Observable<Job[]> {
    return this.findJobs({
      query: {
        orderByChild: "city",
        equalTo: city,
        limitToLast: pageSize
      }
    });
  }

  loadNextJobsCityPage(jobKey: string, pageSize: number, city: string) {           
    return this.af.database.list(`cities/${city}`, {
      query: {
        orderByKey: true,
        endAt: jobKey,
        limitToLast: pageSize + 1
      }
    })
    .map(jpt => jpt.map(job => this.af.database.object(`jobs/${job.$key}`)))
    .flatMap(fbojs => Observable.combineLatest(fbojs));
  }

  findJobById(jobId: string): Observable<Job> {
    return this.af.database.object(`jobs/${jobId}`).map(Job.fromJson);
  }

  createNewJob(job: Job): void {
    let jobs = this.af.database.list("jobs");
    jobs.push(job).then((item) => {
      this.af.database.object(`types/${job.jobType}/${item.key}`).set(true);
      this.af.database.object(`cities/${job.city}/${item.key}`).set(true);
      this.af.database.object(`companyJobs/${job.companyKey}/${item.key}`).set(true);
      this.af.database.object(`jobFields/${job.field}/${item.key}`).set(true);
      this.router.navigate(["/jobs", item.key, job.url]);
    });
  }
  
  // editJob(job: Job, jobId: string, currentJobValue: Job): void {
  //   let theJob = this.af.database.object(`jobs/${jobId}`);
  //   if(job.jobType !== currentJobValue.jobType || job.city !== currentJobValue.city || job.companyKey !== currentJobValue.companyKey || job.field !== currentJobValue.field) {
  //     this.af.database.object(`types/${currentJobValue.jobType}/${jobId}`).remove();
  //     this.af.database.object(`types/${job.jobType}/${jobId}`).set(true);
  //     this.af.database.object(`cities/${currentJobValue.city}/${jobId}`).remove();
  //     this.af.database.object(`cities/${job.city}/${jobId}`).set(true);
  //     this.af.database.object(`companyJobs/${currentJobValue.companyKey}/${jobId}`).remove();
  //     this.af.database.object(`companyJobs/${job.companyKey}/${jobId}`).set(true);
  //     this.af.database.object(`jobFields/${currentJobValue.field}/${jobId}`).remove();
  //     this.af.database.object(`jobFields/${job.field}/${jobId}`).set(true);
  //   }
  //   theJob.update(job).then(() => { this.router.navigate(["/jobs", jobId, job.url]) });
  // }

  editJob(job: Job, jobId: string, currentJobValue: Job): void {
    let theJob = this.af.database.object(`jobs/${jobId}`);
    
      this.af.database.object(`types/${currentJobValue.jobType}/${jobId}`).remove();
      this.af.database.object(`types/${job.jobType}/${jobId}`).set(true);
      this.af.database.object(`cities/${currentJobValue.city}/${jobId}`).remove();
      this.af.database.object(`cities/${job.city}/${jobId}`).set(true);
      this.af.database.object(`companyJobs/${currentJobValue.companyKey}/${jobId}`).remove();
      this.af.database.object(`companyJobs/${job.companyKey}/${jobId}`).set(true);
      this.af.database.object(`jobFields/${currentJobValue.field}/${jobId}`).remove();
      this.af.database.object(`jobFields/${job.field}/${jobId}`).set(true);
    
    theJob.update(job).then(() => { this.router.navigate(["/jobs", jobId, job.url]) });
  }

  removeJob(jobId: string, type: string, city: string, companyKey: string, field: string): void {
    let theJob = this.af.database.object(`jobs/${jobId}`);
    let jobType = this.af.database.object(`types/${type}/${jobId}`);
    let jobCity = this.af.database.object(`cities/${city}/${jobId}`);
    let jobCompany = this.af.database.object(`companyJobs/${companyKey}/${jobId}`);
    let jobField = this.af.database.object(`jobFields/${field}/${jobId}`);
    theJob.remove();
    jobType.remove();
    jobCity.remove();
    jobCompany.remove();
    jobField.remove();
  }

  uploadFile(file: any) {
    let promise = new Promise((res,rej) => {
        let fileName = file.name;
        let uploadTask = this.sdkStorage.child(`/logo/${fileName}`).put(file);
        uploadTask.on('state_changed', function(snapshot) {
        }, function(error) {
            rej(error);
        }, function() {
        var downloadURL = uploadTask.snapshot.downloadURL;
            res(downloadURL);
        });
    });
    return promise;
  }

}
