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
            style({ width: 0}),
            animate('200ms ease-out', 
                    style({ width: '70%'}))
          ]
        ),
        transition(
          ':leave', 
          [
            style({ width: '70%'}),
            animate('200ms ease-in', 
                    style({ width: 0}))
          ]
        )
      ]
    )
  ]
})
export class NavBarComponent implements OnInit {
  navItems: any[] = [{
    icon: "home",
    text: 'Home',
    selectedLink: true
  },
  {
    icon: "dashboard",
    text: 'Dashboard',
    selectedLink: false
  }];
  public innerWidth: number;
  public innerHeight: number;
  public showDropDown = false;
  constructor() { 
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight - 69;
  }

  ngOnInit() {
      
  }

  selectLink(id: any, mobile?: string): void {
    const link =document.getElementById(id) as any;    
    if(mobile) {
      // const buttonElem = link._elementRef.nativeElement;
      this._removeSelectedStyle(mobile);
      this._addStyleToSelectedLink(link, mobile);
    } else {
      // const buttonElem = link._elementRef.nativeElement;
    this._removeSelectedStyle();
    this._addStyleToSelectedLink(link);
    }
  }

  private _addStyleToSelectedLink(link: any, mobile?: string): void {
    if(mobile) {
      link.classList.add("mobile-nd-active-link");
    } else {
      link.classList.add("nd-active-link");
    }
  }

  private _removeSelectedStyle(mobile?: string): void {
    let elems = null;
    if(mobile) {
      elems = document.getElementsByClassName("mobile-nd-active-link") as HTMLCollectionOf<Element>;
      if(elems) {
        const selectedLink = elems[0];
        selectedLink.classList.remove("mobile-nd-active-link");
      }
    } else {
      elems = document.getElementsByClassName("nd-active-link") as HTMLCollectionOf<Element>;
      if(elems) {
        const selectedLink = elems[0];
        selectedLink.classList.remove("nd-active-link");
      }
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

  private _calculateBorder(): number {
    return (70 * this.innerWidth) / 100;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight - 69;
  }

  @HostListener('window:click', ['$event'])
  onClick(event: any) {
    if(this.showDropDown)  {
      if(event.clientX > this._calculateBorder() && event.clientY > 70) {
        this.toggle();
      }
    }
    
  }

}
