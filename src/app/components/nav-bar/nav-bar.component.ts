import { animate, style, transition, trigger } from '@angular/animations';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  animations: [
    trigger(
      'inOutAnimation', 
      [
        transition(
          ':enter', 
          [
            style({ width: 0, opacity: 0 }),
            animate('600ms ease-out', 
                    style({ width: '100%', opacity: 1 }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({ width: '100%', opacity: 1 }),
            animate('600ms ease-in', 
                    style({ width: 0, opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class NavBarComponent implements OnInit {

  public innerWidth: number;
  public innerHeight: number;
  public showDropDown = false;
  constructor() { 
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight - 69;
  }

  ngOnInit() {
      
  }

  selectLink(link: any): void {
    const buttonElem = link._elementRef.nativeElement;
    this._removeSelectedStyle();
    this._addStyleToSelectedLink(buttonElem);
  }

  private _addStyleToSelectedLink(link: any): void {
    link.classList.add("nd-active-link");
  }

  private _removeSelectedStyle(): void {
    const elems = document.getElementsByClassName("nd-active-link") as HTMLCollectionOf<Element>;
    if(elems) {
      const selectedLink = elems[0];
      selectedLink.classList.remove("nd-active-link");
    }
  }

  public smallSize(): boolean {
    return this.innerWidth <= 1024;
  }

  public mobileView(): boolean {
    return this.innerWidth <= 400;
  }

  toggle(): void {
    this.showDropDown =  !this.showDropDown;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight - 69;
  }

}
