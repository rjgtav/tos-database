import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'tos-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss']
})
export class InputNumberComponent implements OnChanges {

  @Input() max: number;
  @Input() min: number;

  @Input() model: number;
  @Output() modelChange: EventEmitter<number> = new EventEmitter();

  @Input() label: string;

  @ViewChild('keyboard')
  keyboard: ElementRef;
  keyboardOpen: boolean;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.model)
      this.model = this.limit(this.model);
  }

  onClick(event, delta: number) {
    this.model = this.limit(this.model + delta);
    this.modelChange.emit(this.model);
  }

  onKeyboard(value: boolean) {
    this.keyboardOpen = value;

    if (this.keyboardOpen)
      window.requestAnimationFrame(() => this.keyboard.nativeElement.focus());
  }

  onModelChange(newValue) {
    this.model = this.limit(newValue);
    this.modelChange.emit(this.model);
  }

  onWheel(event: MouseWheelEvent): void {
    event.preventDefault();

    this.model = this.limit(this.model + (event.deltaY < 0 ? 1 : -1));
    this.modelChange.emit(this.model);
  }

  limit(model: number) {
    return Math.max(this.min, Math.min(this.max, model));
  }

}
