import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PapaParseService} from "ngx-papaparse";
import {CRUDService} from "../../../service/CRUD.service";
import {TOSJob} from "./tos-job.model";

@Injectable({
  providedIn: 'root'
})
export class TOSJobService extends CRUDService<TOSJob> {

  constructor(http: HttpClient, papa: PapaParseService) {
    super(http, papa, {
      id: '$ID',
      path: 'assets/data/jobs.csv',
      searchKeys: ['$ID', '$ID_NAME', 'Name'],
      step: (row: TOSJob) => new TOSJob(row)
    });
  }

}
