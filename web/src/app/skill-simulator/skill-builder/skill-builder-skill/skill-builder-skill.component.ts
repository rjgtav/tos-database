import {ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {Subscription} from "rxjs";
import {TOSSimulatorBuild} from "../../../shared/domain/tos/tos-build";
import {TOSJob} from "../../../shared/domain/tos/job/tos-job.model";
import {TOSSkill} from "../../../shared/domain/tos/skill/tos-skill.model";
import {SkillSimulatorService} from "../../skill-simulator.service";
import {TOSAttribute} from "../../../shared/domain/tos/attribute/tos-attribute.model";

@Component({
  selector: 'app-skill-builder-skill',
  templateUrl: './skill-builder-skill.component.html',
  styleUrls: ['./skill-builder-skill.component.scss']
})
export class SkillBuilderSkillComponent implements OnChanges, OnDestroy {

  @Input() build: TOSSimulatorBuild;
  @Input() job: TOSJob;
  @Input() skill: TOSSkill;

  attributes: TOSAttribute[];
  skillIncrementAvailablePlus: boolean;
  skillIncrementAvailableMinus: boolean;
  skillLevel: number;
  skillLevelMax: number;

  subscriptionLevel: Subscription;

  constructor(private skillSimulatorService: SkillSimulatorService) { }

  onIncrementClick(event: MouseEvent, delta: number, rollOver?: boolean) {
    event.preventDefault();
    this.build.skillIncrementLevel(this.skill, delta, rollOver);
  }

  onSkillLevelsChange(value: { [key: number]: number }) {
    this.skillLevel = value[this.skill.$ID];
    this.skillLevelMax = this.build.skillLevelMax(this.skill);

    this.skillIncrementAvailablePlus = this.build.skillIncrementLevelAvailable(this.skill, 1);
    this.skillIncrementAvailableMinus = this.build.skillIncrementLevelAvailable(this.skill, -1);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.build || changes.skill) {
      this.attributes = this.skillSimulatorService.AttributesBySkill[this.skill.$ID];

      this.subscriptionLevel && this.subscriptionLevel.unsubscribe();
      this.subscriptionLevel = this.build.skillLevels(this.job).subscribe(value => this.onSkillLevelsChange(value));
    }
  }

  ngOnDestroy(): void {
    this.subscriptionLevel && this.subscriptionLevel.unsubscribe();
  }

}
