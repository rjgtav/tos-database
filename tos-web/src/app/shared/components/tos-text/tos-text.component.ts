import {ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, SimpleChanges} from '@angular/core';

const REGEX_UP_ARROW = /\{img green_up_arrow 16 16\}/g;
const REGEX_VARIABLE = /\{(.*?)\}/g;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tos-text',
  templateUrl: './tos-text.component.html',
  styleUrls: ['./tos-text.component.scss']
})
export class TOSTextComponent implements OnChanges {

  @Input()    text: string;
  @Input()    textValues: { [key: string]: any };

  constructor(private element: ElementRef ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.text) {
      // TODO: support text color
      let text = this.text;
          text = text.replace(REGEX_VARIABLE, (match: string, p1: string) => this.textValues && this.textValues[p1] != undefined ? this.textValues[p1] : match);
          text = text.replace(REGEX_UP_ARROW, `<span class="text-success">▲</span>`);
          text = text.replace(REGEX_VARIABLE, ''); // Remove remaining {}

      this.element.nativeElement.innerHTML = text;
    }
  }

}
