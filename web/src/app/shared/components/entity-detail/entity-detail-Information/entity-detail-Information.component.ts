import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges
} from '@angular/core';
import {EntityDetailChildComponent} from "../entity-detail-child.component";
import {Subscription} from "rxjs";
import {ITOSBuild, ITOSSkill} from "../../../domain/tos/tos-domain";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tos-entity-detail-Information',
  templateUrl: './entity-detail-Information.component.html',
  styleUrls: ['./entity-detail-Information.component.scss']
})
export class EntityDetailInformationComponent extends EntityDetailChildComponent implements OnChanges, OnDestroy {

  @Input() build: ITOSBuild;
  @Input() divider: boolean;
  @Input() header: boolean;

  skillCoolDown: number;
  skillSP: number;
  subscriptionSkill: Subscription;

  constructor(changeDetector: ChangeDetectorRef) { super(changeDetector) }

  async onSkillChange(value: ITOSSkill) {
    if (value == null || value.$ID == this.skill.$ID) {
      this.skillCoolDown = await this.skill.BuildCoolDown(this.build).toPromise() / 1000;
      this.skillSP = await this.skill.BuildSP(this.build).toPromise();
      this.changeDetector.markForCheck();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);

    if (this.build && this.skill) {
      this.subscriptionSkill && this.subscriptionSkill.unsubscribe();
      this.subscriptionSkill = this.build.Skill$.subscribe(value => this.onSkillChange(value));

      this.onSkillChange(null);
    }
  }

  ngOnDestroy(): void {
    this.changeDetector.detach();
    this.subscriptionSkill && this.subscriptionSkill.unsubscribe();
  }


}
