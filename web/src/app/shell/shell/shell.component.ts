import {ChangeDetectionStrategy, Component} from '@angular/core';
import {faCommentAlt} from "@fortawesome/free-solid-svg-icons";
import {faPatreon} from "@fortawesome/free-brands-svg-icons";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tos-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent {

  faCommentAlt = faCommentAlt;
  faPatreon = faPatreon;

  constructor() { }

}
