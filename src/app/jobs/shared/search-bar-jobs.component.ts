import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { JobListCacheService } from "../../shared/services/job-list-cache.service";

@Component({
  selector: 'jb-search-bar-jobs',
  templateUrl: './search-bar-jobs.component.html',
  styleUrls: ['./search-bar-jobs.component.less']
})
export class SearchBarJobsComponent implements OnInit {

  form: FormGroup;

  constructor(private router: Router,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private jobListCacheService: JobListCacheService) { }

  ngOnInit() {
    this.form = this.fb.group({
      q: [""]
    });
    this.route.queryParams.subscribe(params => {
      if(params["q"]) {
        this.form.controls["q"].setValue(params["q"]);
      }
    })
  }

  onSearch() {
    this.jobListCacheService.clearCache();
    if(this.form.controls["q"].value) {
      this.router.navigate(["/jobs"], {queryParams: {q: this.form.controls["q"].value}, relativeTo: this.route });
    }
  }

}
