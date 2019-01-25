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
import {ITOSBuild} from "../../../domain/tos/tos-domain";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tos-entity-detail-SkillFormula',
  templateUrl: './entity-detail-SkillFormula.component.html',
  styleUrls: ['./entity-detail-SkillFormula.component.scss']
})
export class EntityDetailSkillFormulaComponent extends EntityDetailChildComponent implements OnChanges, OnDestroy {

  @Input() build: ITOSBuild;
  @Input() divider: boolean;

  active: string;
  tabs: string[];
  tabsHTML: { [key: string]: string } = {};

  constructor(changeDetector: ChangeDetectorRef) { super(changeDetector); }

  ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);

    if (this.build && this.skill) {
      this.tabs = this.skill.EffectProps
        .map(match => match[1])
        .filter((value, index, self) => self.indexOf(value) === index)
        .concat(['CoolDown', 'SP']);

      this.active = this.tabs[0];
      this.tabs.map(tab => this.build
        .skillEffectFormula$(this.skill, tab)
        .subscribe((value) => {
          this.tabsHTML[tab] = value;
          this.changeDetector.markForCheck();
        })
      );
    }
  }

  ngOnDestroy(): void {
    this.changeDetector.detach();
  }

  onTabClick(event: MouseEvent, tab: string) {
    event.preventDefault();
    this.active = tab;
  }

}
