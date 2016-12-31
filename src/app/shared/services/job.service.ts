import { Injectable, Inject } from '@angular/core';
import { AngularFire, FirebaseRef } from "angularfire2";
import { Router } from "@angular/router";
import { Job } from "./job";
import { Observable } from "Rxjs/rx";

@Injectable()
export class JobService {
  sdkStorage: any;

  constructor(private af: AngularFire,
              @Inject(FirebaseRef) fb,
              private router: Router)
  {
    this.sdkStorage = fb.storage().ref();
  }

  findAllJob(): Observable<Job[]> {
    return this.af.database.list("jobs").map(Job.fromJsonList);
  }

  findJobByType(type: string): Observable<Job[]> {
    return this.af.database.list("jobs", {
      query: {
        orderByChild: "jobType",
        equalTo: type
      }
    }).map(Job.fromJsonList);
  }

  findJobById(jobId: string): Observable<Job> {
    return this.af.database.object(`jobs/${jobId}`).map(Job.fromJson);
  }

  createNewJob(job: Job): void {
    let jobs = this.af.database.list("jobs");
    jobs.push(job).then((item) => { this.router.navigate(["/jobs", item.key, job.url]) });
  }
  
  editJob(job: Job, jobId: string): void {
    let theJob = this.af.database.object(`jobs/${jobId}`);
    theJob.update(job).then(() => { this.router.navigate(["/jobs", jobId, job.url]) });
  }

  removeJob(jobId: string): void {
    let theJob = this.af.database.object(`jobs/${jobId}`);
    theJob.remove();
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
