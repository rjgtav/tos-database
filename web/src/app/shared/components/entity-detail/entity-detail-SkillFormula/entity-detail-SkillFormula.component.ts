import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {EntityDetailChildComponent} from "../entity-detail-child.component";
import {TOSBuild} from "../../../domain/tos/tos-build";

@Component({
  selector: 'tos-entity-detail-SkillFormula',
  templateUrl: './entity-detail-SkillFormula.component.html',
  styleUrls: ['./entity-detail-SkillFormula.component.scss']
})
export class EntityDetailSkillFormulaComponent extends EntityDetailChildComponent implements OnChanges {

  @Input() build: TOSBuild;
  @Input() divider: boolean;

  active: string;
  tabs: string[];
  tabsHTML: { [key: string]: string } = {};

  constructor() { super(); }

  ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);

    if (this.build && this.skill) {
      this.tabs = this.skill.EffectProps.map(match => match[1]);
      this.tabs.map(tab => this.tabsHTML[tab] = this.build.skillEffectFormula(this.skill, tab));

      this.active = this.tabs[0];
    }
  }

  onTabClick(event: MouseEvent, tab: string) {
    event.preventDefault();
    this.active = tab;
  }

}
