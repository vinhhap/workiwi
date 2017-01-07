import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'jb-search-bar-jobs',
  templateUrl: './search-bar-jobs.component.html',
  styleUrls: ['./search-bar-jobs.component.less']
})
export class SearchBarJobsComponent implements OnInit {

  form: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit() {
    this.form = this.fb.group({
      q: ["", Validators.required]
    });
  }

  onSearch() {
    this.router.navigate(["/jobs"], {queryParams: this.form.value, relativeTo: this.route });
  }

}
