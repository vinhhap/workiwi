import { Injectable } from '@angular/core';

@Injectable()
export class JobFieldsListService {

  constructor() { }

  get jobFields() {
    return [
      "Sales",
      "Marketing",
      "Nhân sự",
      "IT",
      "Chăm sóc khách hàng",
      "Hành chính - văn phòng",
      "Thiết kế",
      "Phiên dịch",
      "Tư vấn",
      "Tổ chức sự kiện"
    ];
  }

}
