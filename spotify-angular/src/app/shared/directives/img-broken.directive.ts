import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[appImgBroken]'
})
export class ImgBrokenDirective {
  @Input() customImg: string = ''
  @HostListener('error') handleError():void{
    const elNative = this.elHost.nativeElement
    console.log('Revemto', this.elHost )
    elNative.src=this.customImg
  }
// Host, referencia al huesped>
  constructor(private elHost:ElementRef) { 
    
  }

}
