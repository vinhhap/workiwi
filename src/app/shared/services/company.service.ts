import { Injectable, Inject } from '@angular/core';
import { AngularFire, FirebaseRef } from "angularfire2";
import { Observable } from "rxjs/Rx";
import { Company } from "../model/company";
import { Router } from "@angular/router";

@Injectable()
export class CompanyService {

  sdkStorage: any;

  constructor(private af: AngularFire, @Inject(FirebaseRef) fb, private router: Router) {
    this.sdkStorage = fb.storage().ref();
  }

  findCompanies(query = {}): Observable<Company[]> {
    return this.af.database.list("companies", query).map(Company.fromJsonList);
  }

  findAllCompanies(): Observable<Company[]> {
    return this.findCompanies();
  }

  findCompanyById(companyId: string): Observable<Company> {
    return this.af.database.object(`companies/${companyId}`).map(Company.fromJson);
  }

  removeCompany(companyId: string): void {
    let theCompany = this.af.database.object(`companies/${companyId}`);
    theCompany.remove();
  }

  createNewCompany(company: any): void {
    let jobs = this.af.database.list("companies");
    jobs.push(company).then((item) => {
      this.router.navigate(["/admin/companies"]);
    });
  }

  editCompany(company: Company, companyId: string): void {
    let theCompany = this.af.database.object(`companies/${companyId}`);
    theCompany.update(company).then(() => {
      this.router.navigate(["/admin/companies"]);
    });
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
