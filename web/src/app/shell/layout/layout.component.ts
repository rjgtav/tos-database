import { Component, OnInit } from '@angular/core';
import {faCommentAlt} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  faCommentAlt = faCommentAlt;

  constructor() { }

}
