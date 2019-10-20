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
import {TOSImageService} from "./tos-image.service";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tos-image',
  templateUrl: './tos-image.component.html',
  styleUrls: ['./tos-image.component.scss']
})
export class TOSImageComponent implements OnChanges, OnDestroy {

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
    private image: TOSImageService,
  ) {}

  get imageBackgroundPosition() { return `${ -this.clipX }px ${ -this.clipY }px` }
  get imageBackgroundUrl() { return `url('${ this.src }` }
  get imagePositionLeft() { return `${ -(this.clipWidth - this.width) / 2 }px` }
  get imagePositionTop() { return `${ -(this.clipHeight - this.height) / 2 }px` }
  get imageSizeHeight() { return `${ this.clipHeight }px` }
  get imageSizeWidth() { return `${ this.clipWidth }px` }
  get imageTransform() { return `scale(${ this.width / this.clipWidth }, ${ this.height / this.clipHeight })` }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.id) {
      this.subscription && this.subscription.unsubscribe();
      this.subscription = this.image.get(this.id).subscribe(value => {
        this.clipX = value.clipX;
        this.clipY = value.clipY;
        this.clipHeight = value.clipHeight;
        this.clipWidth = value.clipWidth;
        this.src = value.src;

        // Size
        this.height = this.height || this.clipHeight;
        this.width = this.width || this.clipWidth;

        this.element.nativeElement.style.height = `${ this.height }px`;
        this.element.nativeElement.style.width = `${ this.width }px`;

        this.changeDetector.detectChanges();
      });
    }
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }

}
