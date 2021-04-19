import { Directive, TemplateRef } from '@angular/core';

@Directive({
  /* eslint-disable */
  selector: '[carouselItem]',
})
export class CarouselItemDirective {
  constructor(public tpl: TemplateRef<any>) {}
}
