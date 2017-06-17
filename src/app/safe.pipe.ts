import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {
 constructor(private sanatizer: DomSanitizer) {}
  transform(url: any) {
    return this.sanatizer.bypassSecurityTrustResourceUrl(url);
  }

}
