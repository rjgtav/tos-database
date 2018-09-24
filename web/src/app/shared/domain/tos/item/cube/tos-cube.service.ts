import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PapaParseService} from "ngx-papaparse";
import {CRUDService} from "../../../../service/CRUD.service";
import {TOSCube} from "./tos-cube.model";

@Injectable({
  providedIn: 'root'
})
export class TOSCubeService extends CRUDService<TOSCube> {

  constructor(http: HttpClient, papa: PapaParseService) {
    super(http, papa, {
      id: '$ID',
      path: 'assets/data/cubes.csv',
      searchKeys: ['$ID_NAME', 'Name'],
      step: (row: TOSCube) => new TOSCube(row)
    });
  }

}
