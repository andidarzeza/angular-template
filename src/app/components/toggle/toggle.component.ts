import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss']
})
export class ToggleComponent implements OnInit {

  toggled = true;
  constructor() { }

  ngOnInit(): void {
  }

  toggle(toggleBall: HTMLDivElement, toggleChannel: HTMLDivElement): void {
    if(this.toggled) {
      this._moveToRight(toggleBall, toggleChannel);
    } else {
      this._moveToLeft(toggleBall, toggleChannel);
    }
    this.toggled = !this.toggled;
  }

  private _moveToRight(toggleBall: HTMLDivElement, toggleChannel: HTMLDivElement): void {
    toggleChannel.style.background = 'pink';
    toggleBall.style.left = '';
    toggleBall.style.right = '0px';
    toggleBall.style.transform = "translate(50%, -50%)";
  }

  private _moveToLeft(toggleBall: HTMLDivElement, toggleChannel: HTMLDivElement): void {
    toggleBall.style.left = '0';
    toggleBall.style.right = '';
    toggleChannel.style.background = 'lightgray';
    toggleBall.style.transform = "translate(-50%, -50%)";
  }

}
