import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDatetimemask]'
})
export class DatetimemaskDirective {

  constructor(private element: ElementRef) {
  }
@HostListener('ionInput', ['$event'])
onKeyDown(event: any) {

  const input = this.element.nativeElement.value;

  let ddmmtrimmed = input.replace(/[^0-9]/g, '');

  if (ddmmtrimmed.length > 12) {
    ddmmtrimmed = ddmmtrimmed.substr(0, 12);
  }

  const ddmm = [];

  for (let i = 0; i < ddmmtrimmed.length; i += 2 ) {
  ddmm.push(ddmmtrimmed.substr(i, 2 ));
}

  if (ddmm.length === 0 ) {
    this.element.nativeElement.value = '';
  }

  if (ddmm.length === 1) {
    this.element.nativeElement.value = ddmm[0];
  }

  if (ddmm.length === 2) {
    this.element.nativeElement.value = ddmm[0] + '/' + ddmm[1];
  }

  if (ddmm.length === 3) {
    this.element.nativeElement.value = ddmm[0] + '/' + ddmm[1] + '/' + ddmm[2];
  }

  if (ddmm.length === 4) {
    this.element.nativeElement.value = ddmm[0] + '/' + ddmm[1] + '/' + ddmm[2] + ddmm[3];
  }

  if (ddmm.length === 5) {
    this.element.nativeElement.value = ddmm[0] + '/' + ddmm[1] + '/' + ddmm[2] + ddmm[3] + ' ' + ddmm[4];
  }

  if (ddmm.length === 6) {
    this.element.nativeElement.value = ddmm[0] + '/' + ddmm[1] + '/' + ddmm[2] + ddmm[3] + ' ' + ddmm[4] + ':' + ddmm[5];
  }

}

}
