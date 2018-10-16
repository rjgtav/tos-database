import {ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {EntityDetailChildComponent} from "../entity-detail-child.component";
import {TOSBuild} from "../../../domain/tos/tos-build";
import {Subscription} from "rxjs";

@Component({
  selector: 'tos-entity-detail-Information',
  templateUrl: './entity-detail-Information.component.html',
  styleUrls: ['./entity-detail-Information.component.scss']
})
export class EntityDetailInformationComponent extends EntityDetailChildComponent implements OnChanges, OnDestroy {

  @Input() build: TOSBuild;
  @Input() divider: boolean;
  @Input() header: boolean;

  id: number;
  level: number;
  subscriptionLevels: Subscription;

  constructor(private changeDetector: ChangeDetectorRef) { super() }

  onSkillLevelsChange(value: { [key: number]: number }) {
    if (value[this.skill.$ID] == this.level && this.id == this.skill.$ID) return;

    this.id = this.skill.$ID;
    this.level = value[this.skill.$ID];

    this.changeDetector.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);
    this.ngOnDestroy();

    if (this.build && this.skill)
      this.subscriptionLevels = this.build.jobSkillLevels(this.skill.Link_Job).subscribe(value => this.onSkillLevelsChange(value));
  }

  ngOnDestroy(): void {
    this.subscriptionLevels && this.subscriptionLevels.unsubscribe();
  }


}
