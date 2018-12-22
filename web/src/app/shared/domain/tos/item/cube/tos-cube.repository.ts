import {TOSCube} from "./tos-cube.model";
import {CRUDRepository} from "../../../../service/CRUD.repository";
import {TOSDataSet} from "../../tos-domain";
import {TOSDomainService} from "../../tos-domain.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class TOSCubeRepository extends CRUDRepository<TOSCube> {

  constructor() {
    super(TOSDataSet.CUBES, value => new TOSCube(value), [
      { key: TOSDomainService.CUBES_BY_ID },
    ]);

    TOSDomainService.$repository[TOSDomainService.CUBES] = this;
  }

}
