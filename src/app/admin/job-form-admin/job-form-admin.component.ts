import { Job } from './../../shared/services/job';
import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  OnDestroy
} from '@angular/core';
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
  private initialSubscription: Subscription;
  form: FormGroup;
  ckeditorContent:any;

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
      this.initialSubscription = changes["initialValue"].currentValue.subscribe(data => {
        this.form.patchValue(data);
      });
      
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
