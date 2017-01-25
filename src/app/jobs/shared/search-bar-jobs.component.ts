import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { CityListService } from "../../shared/services/city-list.service";
import { JobListCacheService } from "../../shared/services/job-list-cache.service";

@Component({
  selector: 'jb-search-bar-jobs',
  templateUrl: './search-bar-jobs.component.html',
  styleUrls: ['./search-bar-jobs.component.less']
})
export class SearchBarJobsComponent implements OnInit {

  form: FormGroup;
  public cities: string[];

  constructor(private router: Router,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private cityListService: CityListService,
              private jobListCacheService: JobListCacheService) { }

  ngOnInit() {
    this.form = this.fb.group({
      q: [""],
      city: [""]
    });
    this.cities = this.cityListService.cityName;
  }

  onSearch() {
    this.jobListCacheService.clearCache();
    if(this.form.controls["q"].value) {
      this.router.navigate(["/jobs"], {queryParams: {q: this.form.controls["q"].value}, relativeTo: this.route });
    } else if(this.form.controls["city"].value) {
      this.router.navigate(["/jobs"], {queryParams: {city: this.form.controls["city"].value}, relativeTo: this.route });
    }
  }

}
