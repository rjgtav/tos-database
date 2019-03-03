import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges
} from '@angular/core';
import {Subscription} from "rxjs";
import {TOSSimulatorBuild} from "../../../shared/domain/tos/tos-build";
import {ITOSAttribute, ITOSJob, ITOSSkill} from "../../../shared/domain/tos/tos-domain";
import {TOSEntity} from "../../../shared/domain/tos/tos-entity.model";
import {faMinusCircle, faPlusCircle} from "@fortawesome/free-solid-svg-icons";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-skill-builder-skill',
  templateUrl: './skill-builder-skill.component.html',
  styleUrls: ['./skill-builder-skill.component.scss']
})
export class SkillBuilderSkillComponent implements OnChanges, OnDestroy {
  readonly faPlusCircle = faPlusCircle;
  readonly faMinusCircle = faMinusCircle;
  readonly TOSEntity = TOSEntity;

  @Input() build: TOSSimulatorBuild;
  @Input() job: ITOSJob;
  @Input() skill: ITOSSkill;

  attributes: ITOSAttribute[];
  attributesUnlock: boolean[];
  skillLevel: number = 0;
  skillLevelMax: number = 0;

  subscriptionAttributes: Subscription;
  subscriptionJob: Subscription;
  subscriptionSkill: Subscription;

  constructor(private changeDetector: ChangeDetectorRef) {}

  onSkillLevelIncrementClick(event: MouseEvent, delta: number) {
    event.preventDefault();
    this.build.skillLevelIncrement$(this.skill, delta, false, true);
  }

  onAttributesChange(value: ITOSAttribute[]) {
    this.attributes = value || [];
    this.attributesUnlock = new Array(this.attributes.length);
    this.unlockAttributes(null);
  }

  async onJobChange(value: ITOSJob) {
    if (value == null || value.$ID == this.skill.Link_Job$ID) {
      this.skillLevelMax = await this.build.skillLevelMax$(this.skill).toPromise();
      this.changeDetector.markForCheck();
    }

    if (value) {
      // We need to check whether the attribute has unlocked for every skill change
      this.unlockAttributes([value.$ID_NAME]);
    }
  }

  onSkillChange(value: ITOSSkill) {
    if (value == null || value.$ID == this.skill.$ID)
      this.skillLevel = this.build.skillLevel(this.skill);

    if (value) {
      // We need to check whether the attribute has unlocked for every skill change
      this.unlockAttributes([value.$ID_NAME]);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.build && this.build || changes.skill && this.skill) {
      this.subscriptionAttributes && this.subscriptionAttributes.unsubscribe();
      this.subscriptionAttributes = this.skill.Link_Attributes && this.skill.Link_Attributes.subscribe(value => this.onAttributesChange(value));

      this.subscriptionJob && this.subscriptionJob.unsubscribe();
      this.subscriptionJob = this.build.Job$.subscribe(value => this.onJobChange(value));

      this.subscriptionSkill && this.subscriptionSkill.unsubscribe();
      this.subscriptionSkill = this.build.Skill$.subscribe(value => this.onSkillChange(value));

      // Late init
      this.onJobChange(null);
      this.onSkillChange(null);
    }
  }

  ngOnDestroy(): void {
    this.changeDetector.detach();
    this.subscriptionAttributes && this.subscriptionAttributes.unsubscribe();
    this.subscriptionJob && this.subscriptionJob.unsubscribe();
    this.subscriptionSkill && this.subscriptionSkill.unsubscribe();
  }

  async unlockAttributes(args: string[]) {
    if (!this.attributes) return;

    let dirty = false;

    for (let i = 0; i < this.attributes.length; i ++) {
      let attribute = this.attributes[i];

      if (args == null || attribute.unlockAvailableCheck(args)) {
        dirty = true;
        this.attributesUnlock[i] = await attribute.unlockAvailable(this.build).toPromise();
      }
    }

    if (dirty)
      this.changeDetector.markForCheck();
  }

}
