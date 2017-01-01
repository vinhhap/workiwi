import { Job } from './../../shared/services/job';
import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { JobService } from "../../shared/services/job.service";

@Component({
  selector: 'jb-job-form-admin',
  templateUrl: './job-form-admin.component.html',
  styleUrls: ['./job-form-admin.component.less']
})
export class JobFormAdminComponent implements OnInit, OnChanges {
  
  @Input() initialValue: any;
  form: FormGroup;
  ckeditorContent:any;
  private job: Job;

  constructor(private fb: FormBuilder, private jobService: JobService) {
    this.form = fb.group({
      jobTitle: ["", Validators.required],
      companyName: ["", Validators.required],
      city: ["", Validators.required],
      jobType: ["fulltime", Validators.required],
      wage: ["", Validators.required],
      address: ["", Validators.required],
      description: ["", Validators.required],
      applyMethod: ["", Validators.required],
      deadline: ["", Validators.required],
      url: ["", Validators.required],
      // active: [true, Validators.required],
      companyDescription: [""],
      logo: [""]
    });
  }

  ngOnInit() {
    this.ckeditorContent = `<p>My HTML</p>`;
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

  get valid() {
    return this.form.valid;
  }
}
