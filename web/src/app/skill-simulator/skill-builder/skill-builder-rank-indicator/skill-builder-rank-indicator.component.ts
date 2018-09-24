import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-skill-builder-rank-indicator',
  templateUrl: './skill-builder-rank-indicator.component.html',
  styleUrls: ['./skill-builder-rank-indicator.component.scss']
})
export class SkillBuilderRankIndicatorComponent {

  @Input() rank: number;
  @Input() remove: boolean;
  @Output() removeChange: EventEmitter<number> = new EventEmitter();

  constructor() { }

  onRemoveClick(event: MouseEvent) {
    event.preventDefault();
    this.removeChange.emit(this.rank);
  }

}
