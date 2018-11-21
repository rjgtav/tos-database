import {ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {EntityDetailChildComponent} from "../entity-detail-child.component";
import {Subscription} from "rxjs";
import {ITOSBuild} from "../../../domain/tos/tos-domain";
import {TOSDatabaseBuild} from "../../../domain/tos/tos-build";
import {TOSRegionService} from "../../../service/tos-region.service";

@Component({
  selector: 'tos-entity-detail-Skill',
  templateUrl: './entity-detail-Skill.component.html',
  styleUrls: ['./entity-detail-Skill.component.scss']
})
export class EntityDetailSkillComponent extends EntityDetailChildComponent implements OnChanges, OnDestroy {

  @Input() build: ITOSBuild;
  @Input() divider: boolean;
  @Input() input: boolean;

  effectHTML: string;
  skillLevel: number;
  subscriptionLevels: Subscription;

  constructor(private changeDetector: ChangeDetectorRef) { super() }

  onSkillLevelsChange(value: { [key: number]: number }) {
    this.skillLevel = value[this.skill.$ID];
    this.effectHTML = this.build.skillEffect(this.skill, this.input);

    this.changeDetector.detectChanges();
  }

  onSkillLevelChange(value: number) {
    this.build.skillLevelIncrement(this.skill, value - this.skillLevel);
  }

  ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);
    this.ngOnDestroy();

    if (changes.entity && this.skill) {
      if (!this.build) {
        this.build = TOSDatabaseBuild.new(TOSRegionService.Region);
        this.build.jobAdd(this.skill.Link_Job);
      }

      this.subscriptionLevels = this.build.jobSkillLevels(this.skill.Link_Job).subscribe(value => this.onSkillLevelsChange(value));
    }
  }

  ngOnDestroy(): void {
    this.subscriptionLevels && this.subscriptionLevels.unsubscribe();
  }

}
