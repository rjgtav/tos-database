import {Pipe, PipeTransform} from "@angular/core";
import {DomSanitizer, SafeStyle} from "@angular/platform-browser";


@Pipe({
  name: 'sanitizeCSS'
})
export class SanitizeCSSPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string, args?: any): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(value);
  }

}
