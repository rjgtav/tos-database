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
import {faMinus, faPlus, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {ITOSAttribute, ITOSJob, ITOSSkill} from "../../../shared/domain/tos/tos-domain";
import {TOSEntity} from "../../../shared/domain/tos/tos-entity.model";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-skill-builder-job',
  templateUrl: './skill-builder-job.component.html',
  styleUrls: ['./skill-builder-job.component.scss']
})
export class SkillBuilderJobComponent implements OnChanges, OnDestroy {

  faTrashAlt = faTrashAlt;
  faMinus = faMinus;
  faPlus = faPlus;
  TOSEntity = TOSEntity;

  @Input() build: TOSSimulatorBuild;
  @Input() job: ITOSJob;

  attributes: ITOSAttribute[];
  attributesUnlock: boolean[];
  circles: number[];
  isOpen: boolean;
  skills: ITOSSkill[];
  skillPoints: number;

  subscriptionAttributes: Subscription;
  subscriptionJob: Subscription;
  subscriptionSkill: Subscription;
  subscriptionSkills: Subscription;

  constructor(private changeDetector: ChangeDetectorRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.build && this.job) {
      this.subscriptionAttributes && this.subscriptionAttributes.unsubscribe();
      this.subscriptionAttributes = this.job.Link_Attributes && this.job.Link_Attributes.subscribe(value => this.onAttributesChange(value));

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

  onAttributesChange(value: ITOSAttribute[]) {
    this.attributes = value.filter(value => !value.Link_Skill);
    this.attributesUnlock = new Array(this.attributes.length);
    this.changeDetector.markForCheck();
    this.unlockAttributes(null);
  }

  onJobChange(value: ITOSJob) {
    if (value == null || value.$ID == this.job.$ID) {
      let ranks = this.build.jobRanks(this.job);
      this.circles = Array.from({length: ranks.length}, (x, i) => i + 1);
      this.skillPoints = this.build.skillPoints(this.job);

      this.subscriptionSkills && this.subscriptionSkills.unsubscribe();
      this.subscriptionSkills = this.job.Link_Skills.subscribe(value => this.onSkillsChange(value));
    }

    if (value) {
      // We need to check whether the attribute has unlocked for every job change
      // Note: due to attributes that depend on rank change, we can't specify only the job ID in here
      this.unlockAttributes(null);
    }
  }

  onSkillChange(value: ITOSSkill) {
    if (value == null || this.job.Link_Skills$ID.indexOf(value.$ID) >= 0) {
      this.skillPoints = this.build.skillPoints(this.job);
    }

    if (value) {
      // We need to check whether the attribute has unlocked for every skill change
      this.unlockAttributes([value.$ID_NAME]);
    }
  }

  onSkillsChange(value: ITOSSkill[]) {
    this.skills = value
      .filter(skill => skill.RequiredCircle <= this.circles.length)
      .sort((a, b) => a.RequiredCircle - b.RequiredCircle);

    this.changeDetector.markForCheck();
    this.unlockAttributes(this.skills.map(value => value.$ID_NAME));
  }

  onRemoveClick(event: MouseEvent) {
    event.preventDefault();
    this.build.jobRemove$(this.build.jobRanks(this.job).pop());
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
