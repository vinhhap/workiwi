import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { JobListCacheService } from "../../shared/services/job-list-cache.service";
import { CityListService } from "../../shared/services/city-list.service";
import { JobTypeListService } from "../../shared/services/job-type-list.service";

@Component({
  selector: 'jb-search-bar-jobs',
  templateUrl: './search-bar-jobs.component.html',
  styleUrls: ['./search-bar-jobs.component.less']
})
export class SearchBarJobsComponent implements OnInit {

  form: FormGroup;
  public citiesName: string[];
  public jobTypesName: string[];

  constructor(private router: Router,
              private fb: FormBuilder,
              private jobListCacheService: JobListCacheService,
              private cityListService: CityListService,
              private jobTypeListService: JobTypeListService) { }

  ngOnInit() {
    this.form = this.fb.group({
      keyword: [""],
      jobType: [""],
      city: [""]
    });

    this.citiesName = this.cityListService.cityName;
    this.jobTypesName = this.jobTypeListService.jobTypeName;
  }

  onSearch() {
    this.jobListCacheService.clearCache();
    let query = "";
    if(this.form.controls["keyword"].value) {
      query = query + `+jobTitle:${this.form.controls["keyword"].value}`;
    }
    if(this.form.controls["jobType"].value) {
      query = query + " " + `+jobType:${this.form.controls["jobType"].value}`;
    }
    if(this.form.controls["city"].value) {
      query = query + " " + `+city:${this.form.controls["city"].value}`;
    }
    if(query.length > 0) {
      this.router.navigate(["/jobs"], {queryParams: {q: query} });
    }
  }

}
