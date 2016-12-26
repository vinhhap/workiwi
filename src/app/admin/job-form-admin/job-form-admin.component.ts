import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "Rxjs/rx";
import { JobService } from "../../shared/services/job.service";

@Component({
  selector: 'jb-job-form-admin',
  templateUrl: './job-form-admin.component.html',
  styleUrls: ['./job-form-admin.component.less']
})
export class JobFormAdminComponent implements OnInit, OnChanges, OnDestroy {
  
  @Input() initialValue: any;
  public logoLink: any = '';

  private initialSubscription: Subscription;

  form: FormGroup;

  constructor(private fb: FormBuilder, private jobService: JobService) {
    this.form = fb.group({
      jobTitle: ["", Validators.required],
      companyName: ["", Validators.required],
      jobType: fb.group({
        fullTime: [true, Validators.required],
        partTime: [false, Validators.required],
        intern: [false, Validators.required]
      }),
      jobDescription: ["", Validators.required],
      applyMethod: ["", Validators.required],
      deadline: ["", Validators.required],
      contact: ["", Validators.required],
      companyDescription: ["", Validators.required],
      website: ["", Validators.required],
      logo: ["", Validators.required]
    });
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes["initialValue"]) {
      this.initialSubscription = changes["initialValue"].currentValue.subscribe(data => this.form.patchValue(data));
    }
  }

  ngOnDestroy() {
    if(this.initialSubscription) {
      this.initialSubscription.unsubscribe();
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
