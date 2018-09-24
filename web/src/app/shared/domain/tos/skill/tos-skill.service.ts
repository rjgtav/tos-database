import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PapaParseService} from "ngx-papaparse";
import {CRUDService} from "../../../service/CRUD.service";
import {TOSSkill} from "./tos-skill.model";

@Injectable({
  providedIn: 'root'
})
export class TOSSkillService extends CRUDService<TOSSkill> {

  constructor(http: HttpClient, papa: PapaParseService) {
    super(http, papa, {
      id: '$ID',
      path: 'assets/data/skills.csv',
      searchKeys: ['$ID_NAME', 'Name'],
      step: (row: TOSSkill) => new TOSSkill(row)
    });
  }

}
