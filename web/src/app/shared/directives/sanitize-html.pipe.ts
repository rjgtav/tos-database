import {Pipe, PipeTransform} from "@angular/core";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";


@Pipe({
  name: 'sanitizeHTML'
})
export class SanitizeHTMLPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string, args?: any): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }

}
