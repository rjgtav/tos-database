import {Component, Input} from '@angular/core';
import {TOSJob} from "../../../shared/domain/tos/job/tos-job.model";
import {SizeProp} from "@fortawesome/fontawesome-svg-core";

@Component({
  selector: 'app-skill-builder-job-icon',
  templateUrl: './skill-builder-job-icon.component.html',
  styleUrls: ['./skill-builder-job-icon.component.scss']
})
export class SkillBuilderJobIconComponent {

  @Input() circle: number;
  @Input() job: TOSJob;
  @Input() size: SizeProp;

  constructor() { }

}
