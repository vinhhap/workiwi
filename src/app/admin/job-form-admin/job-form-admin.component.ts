import { Job } from './../../shared/model/job';
import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  OnDestroy,
  NgZone
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { JobService } from "../../shared/services/job.service";
import { CityListService } from "../../shared/services/city-list.service";
import { JobTypeListService } from "../../shared/services/job-type-list.service";
import { Subscription } from "rxjs/Rx";
import { SearchService } from "../../shared/services/search.service";
import { JobFieldsListService } from "../../shared/services/job-fields-list.service";

@Component({
  selector: 'jb-job-form-admin',
  templateUrl: './job-form-admin.component.html',
  styleUrls: ['./job-form-admin.component.less']
})
export class JobFormAdminComponent implements OnInit, OnChanges, OnDestroy {
  
  @Input() initialValue: any;
  form: FormGroup;
  ckeditorContent: any;
  private sub: Subscription;
  private job: Job;
  public citiesName: string[];
  public jobTypesName: string[];
  public companyHashTags: any;
  public companyHashTagsCount: number;
  public jobFields: string[];

  constructor(private fb: FormBuilder,
              private jobService: JobService,
              private cityListService: CityListService,
              private searchService: SearchService,
              private zone: NgZone,
              private jobTypeListService: JobTypeListService,
              private jobFieldsListService: JobFieldsListService) {
    this.form = fb.group({
      jobTitle: ["", Validators.required],
      companyName: ["", Validators.required],
      companyKey: ["", Validators.required],
      field: ["Sales", Validators.required],
      city: ["Hà Nội", Validators.required],
      jobType: ["fulltime", Validators.required],
      wage: ["", Validators.required],
      description: ["", Validators.required],
      applyMethod: ["", Validators.required],
      deadline: ["", Validators.required],
      url: ["", Validators.required]
    });
  }

  ngOnInit() {
    this.ckeditorContent = `<p>My HTML</p>`;
    this.citiesName = this.cityListService.cityName;
    this.jobTypesName = this.jobTypeListService.jobTypeName;
    this.jobFields = this.jobFieldsListService.jobFields;
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes["initialValue"]) {
      this.job = changes["initialValue"].currentValue;
      if(this.job) {
        this.form.patchValue(this.job);
      }
    }
  }

  onFileChange(ev) {
    let file = ev.target.files[0];
    this.jobService.uploadFile(file).then((val) => {
      this.form.controls["logo"].setValue(val);
    });
  }

  onSearchName(field: any) {
    if(field.value.length > 0) {
      this.sub = this.searchService.doSearch({
        index: "firebase",
        type: "company",
        q: field.value
      }).subscribe(value => {
        this.zone.run(() => {
          if(value.hasOwnProperty("hits")) {
            this.companyHashTagsCount = value["total"];
            this.companyHashTags = value["hits"];
          }
        });
      });
    }
  }

  addCompany(company: any) {
    this.form.controls["companyKey"].setValue(company._id);
    this.form.controls["companyName"].setValue(company._source.name);
  }

  ngOnDestroy() {
    if(this.sub) {
      this.sub.unsubscribe();
    }
  }

  jobTypeName(jobType: string) {
    switch(jobType) {
      case "fulltime": {
        return "Full-time";
      }
      case "parttime": {
        return "Part-time";
      }
      case "intern": {
        return "Thực tập";
      }
    }
  }

  get valid() {
    return this.form.valid;
  }
}
