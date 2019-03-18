import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
 
@Pipe({
  name: 'safeHTML'
})
export class SafeHtml2Pipe implements PipeTransform {
 
  constructor(private sanitizer: DomSanitizer) {
  }
 
  transform(value: any, args?: any): any {
    return this.sanitizer.bypassSecurityTrustUrl(value);
  }
 
}