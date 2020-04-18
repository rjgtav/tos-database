import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges
} from '@angular/core';
import {Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {TOSUrlService} from "../../service/tos-url.service";
import {TOSRegionService} from "../../domain/tos-region";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tos-image',
  templateUrl: './tos-image.component.html',
  styleUrls: ['./tos-image.component.scss']
})
export class TOSImageComponent implements OnChanges, OnDestroy {

  @Input()  filterInvert: boolean;
  @Input()  id: string;
  @Input()  height: number;
  @Input()  width: number;

  clipHeight: number;
  clipWidth: number;
  clipX: number;
  clipY: number;
  src: string;

  private subscription: Subscription;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private element: ElementRef,
    private http: HttpClient,
  ) {}

  get imageBackgroundPosition() { return `${ -this.clipX }px ${ -this.clipY }px` }
  get imageBackgroundUrl() { return `url('${ this.src }` }
  get imagePositionLeft() { return `${ -(this.clipWidth - this.width) / 2 }px` }
  get imagePositionTop() { return `${ -(this.clipHeight - this.height) / 2 }px` }
  get imageSizeHeight() { return `${ this.clipHeight }px` }
  get imageSizeWidth() { return `${ this.clipWidth }px` }
  get imageTransform() { return `scale(${ this.width / this.clipWidth }, ${ this.height / this.clipHeight })` }
  get imageFilter() { return this.filterInvert ? 'invert(1) contrast(2)' : '' }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.id) {
      this.src = null;
      this.subscription && this.subscription.unsubscribe();
      this.subscription = this.id && this.http
        .get(TOSUrlService.Api(`${ TOSRegionService.toUrl() }/image/${ this.id }.js`), { responseType: 'text' })
        .subscribe(value => {
          let sprite = value;
          let spriteParts = sprite && sprite.split(';');
          let spriteRect = spriteParts && spriteParts[1].split(' ');

          this.clipX = spriteRect && +spriteRect[0];
          this.clipY = spriteRect && +spriteRect[1];
          this.clipHeight = spriteRect && +spriteRect[3];
          this.clipWidth = spriteRect && +spriteRect[2];
          this.src = spriteParts && TOSUrlService.AssetRegion(`ui/${ spriteParts[0] }`);

          // Size
          this.height = this.height || this.clipHeight;
          this.width = this.width || this.clipWidth;

          this.element.nativeElement.style.height = `${ this.height }px`;
          this.element.nativeElement.style.width = `${ this.width }px`;

          this.changeDetector.detectChanges();
        });
    }

    if (changes.height || changes.width) {
      this.element.nativeElement.style.height = `${ this.height }px`;
      this.element.nativeElement.style.width = `${ this.width }px`;
    }

  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }

}
