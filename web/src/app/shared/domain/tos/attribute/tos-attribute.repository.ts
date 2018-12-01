import {CRUDRepository} from "../../../service/CRUD.repository";
import {Observable} from "rxjs";
import {TOSAttribute} from "./tos-attribute.model";
import {TOSDomainService} from "../tos-domain.service";
import {TOSDataSet} from "../tos-domain";
import {TOSRegion} from "../../tos-region";
import {ArrayUtils} from "../../../utils/array-utils";

export class TOSAttributeRepository extends CRUDRepository<TOSAttribute> {

  static readonly instance = new TOSAttributeRepository();

  private constructor() {
    super(TOSDataSet.ATTRIBUTES);

    TOSDomainService.$loader[TOSDomainService.ATTRIBUTES] = () => this.Attributes;
    TOSDomainService.$loader[TOSDomainService.ATTRIBUTES_BY_ID] = () => this.AttributesById;
    TOSDomainService.$loader[TOSDomainService.ATTRIBUTES_BY_ID_NAME] = () => this.AttributesByIdName;
    TOSDomainService.$loader[TOSDomainService.ATTRIBUTES_BY_JOB] = () => this.AttributesByJob;
    TOSDomainService.$loader[TOSDomainService.ATTRIBUTES_BY_SKILL] = () => this.AttributesBySkill;
  }

  get Attributes() { return this.$data.map(value => new TOSAttribute(value)) }
  get AttributesById() { return ArrayUtils.reduce(TOSDomainService.attributes, '$ID') }
  get AttributesByIdName() { return ArrayUtils.reduce(TOSDomainService.attributes, '$ID_NAME') }
  get AttributesByJob() { return ArrayUtils.reduce(TOSDomainService.attributes, 'Link_Jobs.$ID', true) }
  get AttributesBySkill() { return ArrayUtils.reduce(TOSDomainService.attributes, 'Link_Skill.$ID', true) }

  load(force: boolean, region: TOSRegion): Observable<boolean> {
    if (force) {
      TOSDomainService.clear(TOSDomainService.ATTRIBUTES);
      TOSDomainService.clear(TOSDomainService.ATTRIBUTES_BY_ID);
      TOSDomainService.clear(TOSDomainService.ATTRIBUTES_BY_ID_NAME);
      TOSDomainService.clear(TOSDomainService.ATTRIBUTES_BY_JOB);
      TOSDomainService.clear(TOSDomainService.ATTRIBUTES_BY_SKILL);
    }

    return super.load(force, region);
  }

}
