import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CompanyService } from "../../shared/services/company.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Company } from "../../shared/model/company";

@Component({
  selector: 'jb-company-form-admin',
  templateUrl: './company-form-admin.component.html',
  styleUrls: ['./company-form-admin.component.less']
})
export class CompanyFormAdminComponent implements OnInit, OnChanges {

  @Input() initialValue: any;
  public form: FormGroup;
  private company: Company;
  
  constructor(private fb: FormBuilder, private companyService: CompanyService) {
    this.form = fb.group({
      name: ["", Validators.required],
      logoUrl: ["", Validators.required],
      comDes: ["", Validators.required],
      webUrl: [""]
    });
  }

  ngOnInit() {
    
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes["initialValue"]) {
      this.company = changes["initialValue"].currentValue;
      if(this.company) {
        this.form.patchValue(this.company);
      }
    }
  }

  onFileChange(ev) {
    let file = ev.target.files[0];
    this.companyService.uploadFile(file).then((val) => {
      this.form.controls["logoUrl"].setValue(val);
    });
  }

}
