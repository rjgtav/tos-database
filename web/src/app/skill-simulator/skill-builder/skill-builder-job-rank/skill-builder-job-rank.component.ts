import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-skill-builder-job-rank',
  templateUrl: './skill-builder-job-rank.component.html',
  styleUrls: ['./skill-builder-job-rank.component.scss']
})
export class SkillBuilderJobRankComponent {

  @Input() rank: number;
  @Input() remove: boolean;
  @Output() removeChange: EventEmitter<number> = new EventEmitter();

  constructor() { }

  onRemoveClick(event: MouseEvent) {
    event.preventDefault();
    this.removeChange.emit(this.rank);
  }

}
