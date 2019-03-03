import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {SizeProp} from "@fortawesome/fontawesome-svg-core";
import {TOSJob} from "../../../domain/tos/job/tos-job.model";
import {faStar} from "@fortawesome/free-solid-svg-icons";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tos-entity-detail-JobIcon',
  templateUrl: './skill-builder-job-icon.component.html',
  styleUrls: ['./skill-builder-job-icon.component.scss']
})
export class EntityDetailJobIconComponent {
  readonly faStar = faStar;

  @Input() circle: number;
  @Input() job: TOSJob;
  @Input() size: SizeProp;

  constructor() { }

}
