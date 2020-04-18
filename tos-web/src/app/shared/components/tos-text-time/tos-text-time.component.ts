import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {LUAService} from "../../service/lua.service";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tos-text-time',
  templateUrl: './tos-text-time.component.html',
  styleUrls: ['./tos-text-time.component.scss']
})
export class TosTextTimeComponent implements OnChanges {

  @Input()    time: number;

  d: number = 0;
  h: number = 0;
  m: number = 0;
  s: number = 0;

  constructor(private changeDetector: ChangeDetectorRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    // TODO: When we implement ScpArgMsg, we can simply call GET_TIME_TXT directly
    // shared.ipf/script/localize_lang.lua > GET_TIME_TXT
    if (changes.time) {
      LUAService.INSTANCE.call('GET_DHMS', [Math.floor(this.time)]).subscribe((value: number[]) => {
        this.d = value[0];
        this.h = value[1];
        this.m = value[2];
        this.s = value[3];

        console.log(this.d, this.h, this.m, this.s, this.h > 0);
        this.changeDetector.markForCheck();
      })
    }
  }

}
